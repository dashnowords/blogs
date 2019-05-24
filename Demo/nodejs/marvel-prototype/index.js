'use strict';

//父类定义
function EventEmitter(){
    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
}
//父类原型方法
EventEmitter.prototype.methodInEEProto = function(){};
//父类静态方法
EventEmitter.getMaxListener = function(){return this.maxListeners}
//父类静态参属性
EventEmitter.maxListeners = 10;

//子类定义
function Worker(options) {
  if (!(this instanceof Worker))
    return new Worker(options);

  EventEmitter.call(this);
}

//继承原型方法
Object.setPrototypeOf(Worker.prototype, EventEmitter.prototype);
//继承静态方法
Object.setPrototypeOf(Worker, EventEmitter);

//添加子类原型方法
Worker.prototype.kill = function() {};

Worker.prototype.send = function() {};

Worker.prototype.isDead = function() {};

Worker.prototype.isConnected = function() {};

let worker = new Worker();
console.log('worker实例:',worker);
console.log('Worker静态方法:',Worker.getMaxListener());