class Queue{
    constructor(){
        this.queue = [];
    }

    //入队
    enqueue(item){
        this.queue.push(item);
    }

    //出队
    dequeue(){
       return this.queue.shift();
    }

    //获取队头元素
    getHeader(){
        return this.queue[0];
    }

    //获取队尾元素
    getTail(){
        return this.queue[this.queue.length - 1];
    }

    //获取长度
    getLength(){
        return this.queue.length;
    }

    //判断是否为空
    isEmpty(){
        return this.queue.length === 0;
    }
}

module.exports = Queue;