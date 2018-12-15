//侧边栏服务
app.service('heroService',['$http','$q','ModalService',function ($http,$q,ModalService) {
   
    var tableHeaders = ['Name','Age','Hero','Power'];

     /**
     * 获取侧边栏定义
     */
    this.getTableHeaders = function () {
        return tableHeaders;
    }
    
    /**
     * 查询英雄数据
     * @param  {[type]} params [模拟参数]
     * @return {[type]}        [description]
     */
    this.getHeroData = function (params) {
          var deferred = $q.defer();
          !params && ModalService.showToast('参数异常','未填写repo参数');
          $http.get('http://localhost:8926/users', params ? {params:{repo:params}}: {}).then(function (response) {
           if (!response.data.status) {
              deferred.resolve(response.data.data);
           } 
          });
         return deferred.promise;
    }
}]);