;
(function() {
    function Router() {
        //记录路由的跳转历史
        this.historyStack = [];
        //记录已注册的路由信息
        this.registeredRouter = [];
        //路由匹配失败时跳转项
        this.otherwiseRouter = {
            path: '/',
            content: 'home page'
        }
    }

    /**
     * 绑定window.onhashchange事件的回调函数
     * @return {[type]} [description]
     */
    Router.prototype.init = function() {
        if (this._canIUse()) {
            //如果可用，则为所有标记有ui-sref属性的标签注册点击事件监听
            this._bindEvents();
        } else {
            alert('your browser is too old to support $router function');
        }
    }

    /**
     * 判断是否支持historyAPI
     * @return {[type]} [description]
     */
    Router.prototype._canIUse = function() {
        return window.history.pushState;
    }

    /**
     * 监听路由锚点的点击事件
     * @return {[type]} [description]
     */
    Router.prototype._bindEvents = function() {
        var _anchors = document.querySelectorAll('a[ui-sref]');
        Array.from(_anchors).map((item, index) => {
            item.parentNode.addEventListener('click', () => {
                return this.go(item.getAttribute('ui-sref'));
            });
        });
    }

    /**
     * 路由注册方法
     * @param  {String} path [自定义的地址]
     * @param  {String} content [用于输出到当前path的内容]
     * @return {[type]}      [description]
     */
    Router.prototype.when = function(path, content) {
        if (typeof path !== 'string' || typeof content !== 'string') {
            throw new Error('Invalid path or content : type of params can only be String');
        } else {
            if (!this._hasThisRouter(path)) {
                //如果path符合hash地址的格式
                this.registeredRouter.push({
                    path: path,
                    content: content
                });

                //支持链式调用
                return this;
            }
        }
    }

    /**
     * 判断新添加的路由是否已存在
     * @param {String} path 用于判断的地址
     * @return {Boolean} [description]
     */
    Router.prototype._hasThisRouter = function(path) {
        var _data = this.registeredRouter;
        var _length = _data.length;
        for (var i = 0; i < _length; i++) {
            if (_data[i].path === path) {
                return _data[i];
            }
        }
        return false;
    }

    /**
     * 路由不存在时的指定地址
     * @param  {String} path [自定义的地址]
     * @param  {String} content [用于输出到当前path的内容]
     * @return {[type]}      [description]
     */
    Router.prototype.otherwise = function(path, content) {
        if (typeof path !== 'string' || typeof content !== 'string') {
            throw new Error('Invalid path or content : type of params can only be String');
        } else {
                this.otherwiseRouter = {
                    path: path,
                    content: content
                };

                return this;
        }
    }

    /**
     * 路由跳转方法，主动调用时可用于跳转路由
     * @param  {String} topath [已存在的自定义地址]
     * @return {[type]}      [description]
     */
    Router.prototype.go = function(topath) {
        var _router = this._hasThisRouter(topath);
        if (typeof topath === 'string' && _router) {
            this._changeUrl(_router);
            this.render(_router.content);
        }
    }

    /**
     * 利用h5 history API更改url地址栏的显示字段
     * @param  {[type]} router [description]
     * @return {[type]}        [description]
     */
    Router.prototype._changeUrl = function(router) {
        _newState = {
            url: location.origin + '/' + router.path,
            title: document.title,
            path: router.path,
            content: router.content
        };
        window.history.pushState(_newState, '', '/' + router.path);
    }

    /**
     * 用于将对应路由信息渲染至页面,实现路由切换
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    Router.prototype.render = function(content) {
        document.querySelector('div[ui-view]').innerHTML = content;
    }

    var router = new Router();

    //将接口暴露至全局
    window.$router = router;
})();
