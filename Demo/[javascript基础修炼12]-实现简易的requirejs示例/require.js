;(function(window,undefined){
    //模块路径记录
    let modulePaths = {
        main:document.scripts[0].dataset.main.slice(0,-3) //main方法作为根模块
    }
    //模块缓存记录
    let moduleCache = {};
    //未解析的工厂函数栈
    let unResolvedStack = [];
    let NullFunc = ()=>{};
    let anonymousIndex = 0;

    //moduleCache中模块的记录
    class Module {
        constructor(name, path, deps=[],factory){
            this.name = name;//模块名
            this.deps = deps;//模块依赖
            this.path = path;//模块路径
            this.load = false;//是否已加载
            this.exports = {};//工厂函数返回内容
            this.factory = factory || NullFunc;//工厂函数
        }
    }

    /**
     * 模块加载方法
     * 1. 用于启动方法
     * 2. 用于在模块定义中就近依赖
     */
    function _require(...rest){
        let paramsNum = rest.length;
        switch (paramsNum){
            case 1://如果只有一个字符串参数，则按模块名对待，如果只有一个函数模块，则直接执行
                if (typeof rest[0] === 'string') {
                    return _checkModulePath(rest[0]);
                }
            break;
            case 2:
                if (Object.prototype.toString.call(rest[0]).slice(8,13) === 'Array' && typeof rest[1] === 'function'){
                    //如果依赖为空，则直接运行工厂函数，并传入默认参数
                    return _define('anonymous' + anonymousIndex++, rest[0], rest[1]);
                }else{
                    throw new Error('参数类型不正确，require函数签名为(deps:Array<string>, factory:Function):void');
                }
            break;
        }
    }

    /**
     * 模块定义方法，demo中只处理包含传入了完整参数的情况，且假定deps不为空
     * @param {string} id 模块键名
     * @param {array} deps 依赖列表
     * @param {function} factory 工厂函数
     */
    function _define(id, deps, factory){
        let modulePath = modulePaths[id];
        let module = new Module(id, modulePath, deps, factory);
        //模块实例挂载至缓存列表
        moduleCache[id] = module;
        _setUnResolved(id, deps, factory);
    }

    //添加配置方法
    _require.config = function(conf = {}){
        modulePaths = conf.paths;
    }

    /**有依赖时延迟执行模块工厂函数 */
    function _setUnResolved(id, deps, factory) {
        //缓存工厂函数
        unResolvedStack.unshift({id, deps,factory});
        //加载依赖
        deps.map(dep=>_checkModulePath(dep));
    }

    /**
     * 在路径注册表中查询模块路径
     * @param {string} moduleName 模块名 
     */
    function _checkModulePath(moduleName){
        let path = modulePaths[moduleName];
        if(path){
            _loadModule(moduleName,path);
        }else{
            throw new Error('查询的模块不存在');
        }
    }

    /**
     * 模块加载方法
     * @param {string} name 模块名称
     * @param {string} path 外部脚本的加载路径
     */
    function _loadModule(name, path) {
        //如果存在模块的缓存，表示已加载
        if(name !== 'root' && moduleCache[name]) return;
        //如果没有缓存则进行首次加载
        let script = document.createElement('script');
            script.src = path + '.js';
            script.defer = true;
            //初始化待加载模块缓存
            moduleCache[name] = new Module(name,path);
            //加载完毕后回调函数
            script.onload = function(){
                moduleCache[name].load = true;
                //检查待解析模块栈顶元素是否可解析
                _checkunResolvedStack();
            }
            console.log(`开始加载${name}模块的定义文件,地址为${path}.js`);
            document.body.appendChild(script);
    }

    /**检查待执行的工厂函数 */
    function _checkunResolvedStack(){
        //如果没有待解析模块，则直接返回
        if (!unResolvedStack.length)return;
        //否则查看栈顶元素的依赖是否已经全部加载
        let module = unResolvedStack[0];    
        let depsNum = module.deps.length;
        let loadedDepsNum = module.deps.filter(item=>moduleCache[item].load).length;
        if (loadedDepsNum === depsNum) {
            //获取依赖
            let params = module.deps.map(dep=>moduleCache[dep].exports);
            //运行待解析模块的工厂函数并挂载至模块输出
            moduleCache[module.id].exports = module.factory.apply(null,params);
            unResolvedStack.shift();
            return _checkunResolvedStack();
        }
    }
    
    //挂载全局
    window.require = _require;
    window.define = _define;
    
    //从data-main指向开始解析
    _require('main');

})(window)