/**
 * 贪心算法求解背包问题局部最优解
 * 基本思想就是尽可能放入更多高性价比的物品，其他的能放则放，放不了拉倒。
 */
function ksack(values, weights, capacity, n) {
    var load = 0;
    var i =0;
    var w = 0;
    while (load < capacity && i < n){
        if(weights[i] <= (capacity-load)){
            w += values[i];
            load += weights[i];
        }else{
            var r = (capacity - load) / weights[i];
            w += r * values[i];
            load += weights[i];
        }
        i++;
    }
    return w;
}

var items = ["A","B","C","D"];
var values = [50, 140, 60 ,60];
var weights = [5, 20, 10, 12];
var n = 4;
var capacity = 30;

console.log(ksack(values,weights, capacity, n))