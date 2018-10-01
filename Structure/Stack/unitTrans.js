const Stack = require('./stack');
/**
 * 进制转换
 * @param  {number} num    带转换的数字
 * @param  {number} toUnit 需要转换到的进制数
 * @return {number}        转换后的结果
 */
function unitTrans(num, toUnit){
    let stack = new Stack();
    let bit;
    let result = '';
    while(num){
        bit = num % toUnit;
        stack.push(bit);
        num = (num - bit) / toUnit;
    }
    while(!stack.isEmpty()){
        result += stack.pop();
    }
    return result;
}

console.log(unitTrans(12,2))

