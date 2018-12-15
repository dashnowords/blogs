 app.controller('Table@Choice2Controller', ['$scope','heroService',function($scope, heroService) {
         var constCenter = ngOnInit();//保存非交互型变量集合

          function ngOnInit() {
              console.log('Table@Choice2Controller Loaded');
              $scope.headers = heroService.getTableHeaders();
              $scope.tableData = [];//提供表格数据
              bindEvent();
              return {} //返回非交互型状态记录
          }

          /**
           * 绑定跨controller事件监听
           * @return {[type]} [description]
           */
          function bindEvent() {
              $scope.$on('ParentControllerEvent',function (event,data) {
                 switch(data.index) {
                    case 1:
                       changeDOM();
                    break;
                    case 2:
                       searchTableData(data.params);
                    break;
                 }
              })
          }

         /**
           * 将英雄搜索结果挂载至组件
           * @param  {[type]} params [description]
           * @return {[type]}        [description]
           */
          function searchTableData(params) {         
             heroService.getHeroData(params).then(function (heroes) {
               $scope.tableData = heroes;
               rebuildDropList(heroes);
             });
          }
      
         /**
          * 重组数据
          */
         function rebuildDropList(data) {
             var _dropList = _.sortBy(_.unique(_.pluck(data, 'name')),_.identity);
             //向父级发消息
             $scope.$emit('ChildControllerEvent',{
                type:'Table.Change',
                data:_dropList
             });
         }

         /**
          * 操作DOM
          */
         function changeDOM() {
            $scope.pushTable = true;
         }
 }]);