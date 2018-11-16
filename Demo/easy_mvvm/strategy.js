class Strategy{
    constructor(){
        let strategy = {
            //用于单向绑定
            'd-bind':function (node, expr) {
                //订阅指定表达式的变化
                let sub = new Subscriber(this, expr, function (newValue){
                    node.innerHTML = newValue;
                });

                //初始赋值
                /**
                 * 将全局指针指向当前subscriber实例，再读取数据模型中的
                 * this.data[expr]，这样就可以触发对应属性的get方法,该方
                 * 法由于被劫持，所以在读取时，会将window.curSubscriber
                 * (此时指向的是当前作用域中的sub)
                 * 
                 */
                window.curSubscriber = sub;         
                let value = this.data[expr];       
                node.innerHTML = value;
                window.curSubscriber = null;
                console.log(`已完成${node}节点的值与数据模型中的${expr}的【单向绑定】`);
            },
            //用于双向绑定
            'd-model':function (node, expr) {

                let _this = this;
                //订阅指定表达式的变化
                let sub = new Subscriber(this, expr, function (newValue){
                    node.value = newValue;
                });
                
                window.curSubscriber = sub;         
                let value = this.data[expr];       
                node.value = value; //表单元素与显示元素的赋值方式不同
                window.curSubscriber = null;

                /**
                 * 为了将页面上表单元素发生的变化同步至VM模型中还需要添加事件绑定
                 * 实际开发中绑定的事件可以在vm中统一管理,方便后续在对应的生命周
                 * 期钩子触发时进行解绑。
                 */
                node.addEventListener('input',function(event){
                     _this.data[expr] = node.value;
                });

                console.log(`已完成${node}节点的值与数据模型中的${expr}的【双向绑定】`);
            },
            'd-click':function (node, expr) {
                let _self = this;
                let handleClick = function (event){
                   return _self.methods[expr.replace(/\(.*\)/,'')].call(_self, node, event);
                }
                node.addEventListener('click',handleClick);
            }
        }
        return strategy;
    }
}
