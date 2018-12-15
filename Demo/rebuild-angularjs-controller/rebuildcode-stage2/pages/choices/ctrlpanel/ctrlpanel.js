 app.controller('CtrlPanel@Choice2Controller', function($scope) {
     var constCenter = ngOnInit(); //保存非交互型变量集合
     function ngOnInit() {
         console.log('CtrlPanel@Choice2Controller Loaded');
         $scope.filterNames = []; //提供下拉框选项
         $scope.params = { //记录表单数据
             repo: '',
             branch: ''
         }
         bindEvent();
         return {} //返回非交互型状态记录
     }

     /**
      * 点击第一个按钮
      * @return {[type]} [description]
      */
     $scope.handleClickBtn1 = function() {
         $scope.$emit('ChildControllerEvent', {
             type: 'CtrlPanel.BtnClick',
             index: 0
         });
     }
     $scope.handleClickBtn2 = function() {
         $scope.$emit('ChildControllerEvent', {
             type: 'CtrlPanel.BtnClick',
             index: 1
         });
     }
     $scope.handleClickBtn3 = function() {
         $scope.$emit('ChildControllerEvent', {
             type: 'CtrlPanel.BtnClick',
             index: 2,
             params:$scope.params.repo
         });
     }

     function bindEvent() {
         $scope.$on('Table.Change',function (event, data) {
             $scope.filterNames = data.data;
         })
     }
 })