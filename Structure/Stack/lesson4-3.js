const Stack = require('./stack');
function removeYellow(sugarStack) {
    console.log(sugarStack.stack.join('-'));
    let stack2 = new Stack();
    let sugar;
    //黄色丢掉，其余放入另一个栈
    while(!sugarStack.isEmpty()){
        sugar = sugarStack.pop();
        if(sugar !== 'yellow'){
            stack2.push(sugar);
        }else{
            stack2.push('<yellow>');
        }
    }
    //放回原来的栈
    while(!stack2.isEmpty()){
        sugarStack.push(stack2.pop());
    }
    return sugarStack.stack;
}

//测试
let testSuite = new Stack();
let sugarMap={
    0:'red',
    1:'white',
    2:'yellow'
};

//生成测试用例
for(let i =0;i<100;i++){
    testSuite.push(sugarMap[Math.floor(Math.random()*3)]);
}

let result = removeYellow(testSuite);
console.log(result.join('-'));


