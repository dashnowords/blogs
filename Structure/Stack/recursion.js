const Stack = require('./stack');
/**
 * 简易递归求阶乘
 * @param  {number} num 求解参数阶乘
 * @return {number}     num的阶乘结果
 */
function recursion(num) {
    let stack = new Stack();
    let result = 1;
    while(num){
        stack.push(num--);
    }
    while(!stack.isEmpty()){
        result *= stack.pop();
    }
    return result;
}
//测试
let testSuite = [5];
testSuite.map(function (item, index) {
    console.log(recursion(item));
})
