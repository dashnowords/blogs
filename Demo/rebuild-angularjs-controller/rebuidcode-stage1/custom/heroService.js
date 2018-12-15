//侧边栏服务
app.service('heroService',['$http','$q',function ($http,$q) {
   
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
          !params.repo && alert('参数异常');
          $http.get('http://localhost:8926/users', params.repo ? {params:{repo:params.repo}}: {}).then(function (response) {
           if (!response.data.status) {
              deferred.resolve(response.data.data);
           } 
          });
         return deferred.promise;
    }
}]);