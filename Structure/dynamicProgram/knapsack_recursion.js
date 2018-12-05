/**
 * 递归求解0-1背包问题
 * 算法：
 * 1.如果单个物品体积超出背包容量，则肯定不拿
 * 2.如果单个物品体积未超出背包容量，则问题变为在下列两种情况中取较大的值
 * 2.1 放入当前物品 knapsack(capacity - size[n-1], size, value, n-1) + value[n-1])
 * 2.2 不放入当前物品 knapsack(capacity, size, value, n-1) 
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
    //如果没有物品或者背包容量为0 则无法增值
    
    if (n == 0 || capacity == 0 ) {
        return 0;
    }
    if (size[n-1] > capacity) {
        //算法步骤1 从最后一个物品开始，如果单个物品超出容量限制则不放入
        return knapsack(capacity, size, value, n-1);
    } else {
        //算法步骤2
        return max(knapsack(capacity - size[n-1], size, value, n-1) + value[n-1],knapsack(capacity, size, value, n-1));
    }
}

let value = [4,5,10,11,13];
let size = [3,4,7,8,9];
let capacity = 16;
let n = 5;

let result = knapsack(capacity, size, value, n);
console.log('result:',result);


