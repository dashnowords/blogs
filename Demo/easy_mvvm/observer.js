/**
 * 发布者类，同时为一个观察者
 * 功能包括：
 * 1.观察视图模型上数据的变化
 * 2.变化出现时发布变化消息给订阅者
 */
class Observer{
    constructor(data){
        this.data = data;
        this.subQueue = {};//订阅者Map
        this.traverse();
    }

    //遍历数据集中各个属性并添加观察器具
    traverse(){
        Object.keys(this.data).forEach(key=>{
            defineReactive(this.data, key, this.data[key], this);
        });
    }

    notify(key){
        this.subQueue[key].forEach(fn=>fn.update());
    }
}

//修改对象属性的get/set方法实现数据劫持
function defineReactive(obj, key, val, observer) {
    //当键的值仍然是一个对象时，递归处理,observe方法定义在dash.js中
    let childOb = observe(val);

    //数据劫持
    Object.defineProperty(obj, key, {
        enumerable:true,
        configurable:true,
        get:()=>{
            /**
             * 在依赖收集阶段,自定义标签绑定的表达式exp对应VM中的数据集data
             * 或方法集methods,订阅者类实例化时,需要将正在分析的节点和VM中的
             * 模型进行绑定（并获取初始值）,此时必然会触发VM.data[exp]的get方法
             * 此时将对应的订阅者消息添加进发布者的记录中即可。
             * 【注意】：
             * 在订阅者记录队列的处理上，Vue中采用了耦合度更低的做法，即实例化
             * 一个发布订阅管理器Dep类来处理订阅和信息发布，因为需要多个订阅者
             * 的情况但笔者在阅读Vue源码相关的文章时，发现这样的做法对于理解Vue
             * 中双向数据绑定的原理造成了很大困扰；故在本例的实现中为了减少干扰
             * 信息，将订阅者队列的实现放在发布者类中直接实现。
             */
            if (window.curSubscriber) {
                /**
                 * 订阅者实例在从VM读取数据时，先全局的window.curSubscriber指向该实例，
                 * 这样读取时就会触发这个键的get方法，将对应视图的更新方法update作为回
                 * 调添加至发布者的记录队列中。                 
                 */
                 if (observer.subQueue[key] === undefined) {observer.subQueue[key] = []};
                 observer.subQueue[key].push(window.curSubscriber);
            }
            return val;
        },
        set:(newVal)=>{
            if (val === newVal) return;
            val = newVal;
            //监听新值
            childOb = observe(newVal);
            //通知所有订阅者
            observer.notify(key);
        }
    })
}
