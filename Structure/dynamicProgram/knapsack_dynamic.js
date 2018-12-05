/**
 * 动态规划求解0-1背包问题
 */
function max(a,b) {
    return a>b?a:b;
}

/**
 * 
 * @param  {[type]} capacity 背包容量
 * @param  {[type]} size     物品体积数组
 * @param  {[type]} value    物品价值数组
 * @param  {[type]} n        物品个数
 * @return {[type]}          最大价值
 */
function knapsack(capacity, size, value, n) {
    //K[n][capacity]表示0~n-1这n个物品入选时的最优值
    let K = [];
    let pick = [];
    let result = 0;
    for (let i = 0; i <= n ; i++){
       K[i] = [];
       for(let j = 0; j <= capacity; j++){
          if(j === 0 || i === 0){
            //i=0为防御性编程，没有实际意义
            //j=0表示背包容量为0，无法放入故结果为0
            K[i][j] = 0;
          } else if (size[i-1] > j){
            //如果背包容量比第i个物品的重量还小，则第i个物品必然无法放入，相当于前i-1个物品放入j容量背包时的最值
            K[i][j] = K[i-1][j];
          } else {
            //动态规划解,当第i个物品可以放入时，K[i][j]等同于放入i时最值和不放i时的值取最大
            K[i][j] = max(K[i-1][j-size[i-1]] + value[i-1], K[i-1][j]);
          }
       }
    }
    result = K[n][capacity];
    //如何求解到底选了哪些物品?
    while(n > 0){
        if (K[n-1][capacity - size[n-1]] + value[n-1] > K[n-1][capacity]) {
            capacity -= size[n-1];
            n--;
            pick[n] = 1;
        } else {
            n--;
            pick[n] = 0;
        }
    }
    console.log('答案的选择情况为:',pick);
    return result;
}

let value = [4,5,10,11,13];
let size = [3,4,7,8,9];
let capacity = 16;
let n = 5;

let result = knapsack(capacity, size, value, n);
console.log('结果:',result);


