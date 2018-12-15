app.controller('HelloController', ['$scope', '$state', 'sidebarService', function($scope, $state, sidebarService) {

    var constCenter = ngOnInit();

    function ngOnInit() {
        console.log('HelloController Loaded');
        $scope.sidebarList = sidebarService.getList();
        $scope.activeSidebarItem = 0;
        return {
            routerPrefix: sidebarService.getRouterPrefix()
        }
    }
    /**
     * 激活侧边栏选项
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    $scope.activate = function(index) {
        _.each($scope.sidebarList, function(item, i) {
            item.active = i === index ? true : false;
        });
        $scope.activeSidebarItem = index;
        $state.go(constCenter.routerPrefix + index);
    }
}])