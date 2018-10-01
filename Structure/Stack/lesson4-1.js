const Stack = require('./stack');
function bracketShouldAt(str) {
    let symbolMap = {
        '{':-1,
        '}':1,
        '(':-2,
        ')':2,
        '[':-3,
        ']':3
    }
    let stack = new Stack();
    let strArr = str.split('');
    let result = -1;
    for(let i = 0; i < strArr.length; i++){
        if (symbolMap[strArr[i]] < 0) {
            stack.push(strArr[i]);
        }else{
            if (symbolMap[strArr[i]] > 0 &&
                symbolMap[stack.pop()] + symbolMap[strArr[i]] !== 0) {
                result= i;
                break;
            }
        }
    }
    if (!stack.isEmpty()) {result = strArr.length}
    return result === -1 ? 'Right Pairs' : result;
}
let testSuite = ['2.3 + 23/12 + (3.14159 * 0.24','2.3 + (23/12 + 3.14159) * 0.24'];
testSuite.map(function (item, index) {
    console.log(bracketShouldAt(item));
})
