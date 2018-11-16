/**
 * 实现一个MVVM框架Dash
 */
class Dash {
    constructor(options = {}){
      this.el = options.el;
      this.data = options.data;
      this.methods = options.methods;
      this.bindings = {};
      this._init();
    }

    //初始化Dash对象
    _init(){       
        /**
         * 1.获得待编译的DOM模板最外层容器标签的引用
         */
        let oEl = document.getElementById(this.el);
        if (oEl === null) {
            throw new ReferenceError(`can not find an element with the given id "${this.el}"`);
        }else{
            /**
             * 2.对数据集合data进行数据劫持
             */
            observe(this.data);

            /**
             * 3.解析DOM并进行依赖收集
             */
            window.Compiler.compile(this, oEl);
        }
    }
}

//观察指定的数据集
function observe(data) {
    if (data === null || typeof data !== 'object') {
      return;
    }
    return new Observer(data);
}



