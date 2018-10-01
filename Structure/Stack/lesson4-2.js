const Stack = require('./stack');
function orderTransAndResolve(strRaw) {
    let str = strRaw.replace(/\s/g,'');
    let strArr = tokenize(str);
    //转换后缀表达式
    console.log('backOrder expression:',strArr)
}

function tokenize(str){
    let optstack = new Stack();
    let numstack = new Stack();
    let expression = [];
    let length = str.length;
    let i = length - 1;
    let result = 0;
    let temp='';
    let nextnum;
    let nextopt;
    while(i>=0){
        if(/[\d\.]/.test(str[i])){
            temp = str[i] + temp;
        }else{
            numstack.push(temp);
            optstack.push(str[i]);
            temp = '';
        }
        i--;
    }
    if (temp) {
        numstack.push(temp);
    }
    //拼接后缀表达式
    expression.push(parseFloat(numstack.pop()));
    result = expression[0];
    while(!optstack.isEmpty()){
        nextnum = parseFloat(numstack.pop());
        nextopt = optstack.pop();
        expression.push(nextnum);
        expression.push(nextopt);
        switch(nextopt){
            case '+':
            result = result + nextnum;
            break;
            case '-':
            result = result - nextnum;
        }
    }
    console.log('your answer:',result);

    return expression;
}

let testSuite = ['2.3 + 23 - 12 + 3.14159 - 0.24'];
testSuite.map(function (item, index) {
    orderTransAndResolve(item);
    console.log('correct answer:', eval(item));
});
