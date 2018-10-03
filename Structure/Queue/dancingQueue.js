var Queue = require('./queue.js');

function dancingQueue(str) {
    var dancers = str.split(/\s+/);
    var fqueue = new Queue();
    var mqueue = new Queue();
    //入队
    for(let i = 0; i < dancers.length ; i++){
        if (dancers[i][0] === 'M') {
            mqueue.enqueue(dancers[i]);
        } else {
            fqueue.enqueue(dancers[i]);
        }
    }
    //模拟出队
    while(!mqueue.isEmpty() && !fqueue.isEmpty()){
        console.log(mqueue.dequeue(),'+',fqueue.dequeue());
    }
    mqueue.isEmpty?console.log('No Male'):console.log('No Female');
}

let testSuite = 'M-mali1 F-flip F-tomas M-Gone F-test';
dancingQueue(testSuite);