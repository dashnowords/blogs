let Deque = require('./deque.js');

function isPalindrome(str) {
    let de = new Deque();
    let strArr = str.split('').map((item)=>de.push(item));
    let step;
    if (!str) {
        return false;
    }
    step = str.length % 2 ? (str.length - 1) /2 : str.length / 2;
    for (let i = 0; i < step; i++) {
        if (de.shift() !== de.pop()) {
            return false;
        }
    }
    return true;
}

//测试
let testSuite = ['asss','bbacd','sas','abcba'];
testSuite.map(function (item, index) {
    console.log(isPalindrome(item));
})
