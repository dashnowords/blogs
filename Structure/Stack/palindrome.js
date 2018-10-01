const Stack = require('./stack');
/**
 * 回文判断
 * @param  {String}  str 待判断的字符串
 * @return {Boolean}     true表示回文 false表示不是回文
 */
function isPalindrome(str) {
    let stack = new Stack();
    let strArr = str.split('');
    let result = '';
    for(let i = 0; i < strArr.length; i++){
        stack.push(strArr[i]);
    }
    while(!stack.isEmpty()){
        result += stack.pop();
    }
    return result === str; 
}

//测试
let testSuite = ['asss','bbacd','sas','abcba'];
testSuite.map(function (item, index) {
    console.log(isPalindrome(item));
})
