app.controller('Choice2Controller',['$scope','$http','$state','heroService',function ($scope, $http, $state, heroService) {

    var constCenter = ngOnInit();//保存非交互型变量集合

    function ngOnInit() {
        $scope.filterNames = [];//提供下拉框选项
        bindEvent();
        return {} //返回非交互型状态记录
    }

    /**
     * 监听组合视图事件
     * @return {[type]} [description]
     */
    function bindEvent() {
      $scope.$on('ChildControllerEvent',function (event,data) {
          $scope.$broadcast('ParentControllerEvent',data);
          if (data.type === 'Table.Change') {
             $scope.filterNames = data.data;
             $scope.$broadcast('Table.Change',data);
          }
      });
    }
}])