class CircularQueue{
    //构造函数接受一个整数，指定初始存储空间大小
    constructor(length){
        this.queue = new Array(length + 1);
        this.front = 0;//头指针
        this.rear = 0;//尾指针
        this.size = 0;//队列大小
    }

    //入队
    enqueue(item){
       if (this.isFull()) {
          this.resize(this.getLength() * 2 + 1);
       }
       this.queue[this.rear] = item;
       this.size++;
       this.rear = (this.rear + 1) % this.getLength();
    }

    //出队
    dequeue(){
       let item;
       let next;
       let resizeLength;
       if(this.isEmpty()){
          console.log('No more items!');
          return;
       } 
       item = this.queue[this.front];
       this.queue[this.front] = null;
       this.front = (this.front + 1) % this.getLength();
       this.size--;
       //当队列长度小于总长度1/4时，队列总空间减半，假定空间长度大于8时有效
       if (this.getLength() >= 8) {
           resizeLength = Math.floor(this.getLength() / 2);
           if (this.size < resizeLength/2) {
                this.resize(resizeLength);
           }
       }
    }

    //获取存储空间长度
    getLength(){
        return this.queue.length;
    }

    //获取队列长度
    getSize(){
        return this.size;
    }

    //判断是否为空队
    isEmpty(){
        return this.size === 0;
    }

    //判断是否为满队
    isFull(){
        return this.size === this.queue.length;
    }

    //调整循环队列的存储空间
    resize(length){
        let q = new Array(length);
        for (let i = 0; i < length; i++) {
          q[i] = this.queue[(i + this.front) % this.queue.length]
        }
        this.queue = q;
        this.front = 0;
        this.rear = this.size;
    }
}

//测试
console.log('测试初始化');
let cqueue = new CircularQueue(9);
console.log('cqueue.getLength() should be 10:',cqueue.getLength());

//入队
console.log('测试入队');
for(let i = 0; i < 10; i++){
    cqueue.enqueue(i);
}
console.log(cqueue);

//入队溢出
console.log('测试入队溢出');
cqueue.enqueue(10);
console.log(cqueue);

//出队
console.log('测试出队');
cqueue.dequeue();
console.log(cqueue);

//出队收缩
console.log('测试出队收缩');
for(let i = 0; i < 6; i++){
    cqueue.dequeue();
}
console.log(cqueue);
module.exports = CircularQueue;