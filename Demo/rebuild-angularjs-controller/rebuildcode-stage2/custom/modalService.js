app.service('ModalService',['$timeout',function ($timeout) {
    /**
     * 显示信息提示框
     * @param {[type]} title   [description]
     * @param {[type]} content [description]
     */
    this.showToast = function (title, content) {
        var _dom = '<div id="toast" class="toast-active"><h4>'+title+'</h4><p>'+content+'</p></div>';
        angular.element(document.querySelector('#body')).append(_dom);
        $timeout(function () {
            angular.element(document.querySelector('#toast')).remove();
        },3000);
    } 
}]);