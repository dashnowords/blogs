//自定义指令
app.directive('clickTrans',function () {
    return {
        restrict:'EA',
        scope:{
            clickTrans: '='
        },
        link:function (scope, element, attr) {

            scope.$watch('clickTrans',function (newvalue, oldvalue) {
                if (newvalue !== oldvalue) {
                    changeDOM();
                }
            });

            /**
             * 虚拟的DOM改变
             * @return {[type]} [description]
             */
            function changeDOM() {
                element.css({transform:'rotateX(10deg) scale(0.8,0.8)',backgroundColor:'#34495e',color:'white'});
                element.parent().css('perspective','300px');
            }
        }
    }
});
