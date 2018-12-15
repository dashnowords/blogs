//侧边栏服务
app.service('sidebarService',[function () {
   
    var sidebarItemList = [{
            label:'choice1',
            active:true
         },{
            label:'choice2',
            active:false
         },{
            label:'choice3',
            active:false
         },{
            label:'choice4',
            active:false
         },{
            label:'choice5',
            active:false
         },{
            label:'choice6',
            active:false
         }];
    var RouterPrefix = 'hello.choice'

     /**
     * 获取侧边栏定义
     */
    this.getList = function () {
        return sidebarItemList;
    }
    
    /**
     * 获取路由跳转前缀
     */
    this.getRouterPrefix = function () {
        return RouterPrefix;
    }
}]);