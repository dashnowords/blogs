      app.controller('Choice2Controller',['$scope','$http','$state','heroService',function ($scope, $http, $state, heroService) {

          var constCenter = ngOnInit();//保存非交互型变量集合

          function ngOnInit() {
              console.log('Choice2Controller Loaded');
              $scope.headers = heroService.getTableHeaders();
              $scope.filterNames = [];//提供下拉框选项
              $scope.tableData = [];//提供表格数据
              $scope.pushTable = false;//标记表格是否已经进行DOM转换
              $scope.params = {//记录表单数据
                 repo:'',
                 branch:''
              }
              return {} //返回非交互型状态记录
          }

          /**
           * 点击第一个按钮
           * @return {[type]} [description]
           */
          $scope.handleClickBtn1 = function () {
              rebuildDropList();
          }

          $scope.handleClickBtn2 = function () {
              changeDOM();
          }

          $scope.handleClickBtn3 = function () {
             searchTableData();
          }

          /**
           * 将英雄搜索结果挂载至组件
           * @param  {[type]} params [description]
           * @return {[type]}        [description]
           */
          function searchTableData() {
             heroService.getHeroData($scope.params).then(function (heroes) {
               $scope.tableData = heroes;
               rebuildDropList();
             });
          }
      
         /**
          * 重组数据
          */
         function rebuildDropList() {
             $scope.filterNames = _.sortBy(_.unique(_.pluck($scope.tableData, 'name')),_.identity);
         }

         /**
          * 操作DOM
          */
         function changeDOM() {
            $scope.pushTable = true;
         }

      }])