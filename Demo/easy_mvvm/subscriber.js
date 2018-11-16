/**
 * 订阅者类，观察依赖表达式值的变化
 * 功能包括：
 * 1.订阅对应数据模型的变动
 * 2.数据模型发生变动后进行必要的视图刷新
 */
class Subscriber{
    constructor(vm, exp, callback){
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;
        this.value = this.vm.data[this.exp];
    }

    /**
     * 提供给发布者调用的方法
     */
    update(){
        return this.run();
    }

    /**
     * 更新视图时的实际执行函数
     */
    run(){
        let currentVal = this.vm.data[this.exp];
        if (this.value !== currentVal) {
            this.value = currentVal;
            this.callback.call(this.vm, this.value);
        }
    }
}