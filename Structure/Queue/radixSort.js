var Queue = require('./queue.js');
//基数排序
function radixSort(list) {
    let bins = [];
    let results = [];
    for(let i = 0; i < 10; i++){
        bins[i] = new Queue();
    }
    //首次排队
    for(let i =0; i < list.length; i++){
        bins[list[i] % 10].enqueue(list[i]);
    }
    //首次出队
    for(let i =0; i < bins.length; i++){
        while(!bins[i].isEmpty()){
           results.push(bins[i].dequeue()); 
        }
    }
    //二次入队
    for(let i =0; i < results.length; i++){
        bins[Math.floor(results[i]/10)].enqueue(results[i]);
    }
    results = [];
    //二次出队
    for(let i =0; i < bins.length; i++){
        while(!bins[i].isEmpty()){
           results.push(bins[i].dequeue()); 
        }
    }
    console.log(results)
    return results;
}

//测试
let testSuite = [12,34,76,98,57,13,87,47,56,54,68];
radixSort(testSuite);