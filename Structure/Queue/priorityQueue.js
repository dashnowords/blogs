const Queue = require('./queue.js');
class PriorityQueue extends Queue{
   dequeue(){
      let length = this.getLength();
      let index = 0;
      let basePriority;
      let dequeueItem;
      if (!this.isEmpty()) {
        basePriority = this.queue[0].priority;
      }
      for(let i = 1; i < length; i++){
        if (this.queue[i].priority < basePriority) {
            index = i;
            basePriority = this.queue[i].priority;
        }
      }
      dequeueItem = this.queue[index];
      this.queue.splice(index,1);
      return dequeueItem;
   }
}

let p = new PriorityQueue();
let testSuite = [{value:123,priority:3},
                 {value:2,priority:1},
                 {value:'tomas',priority:2}];
testSuite.map((item)=>p.enqueue(item));
console.log(p.dequeue());