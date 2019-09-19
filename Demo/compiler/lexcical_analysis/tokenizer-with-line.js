let snippet = `
var b3 = 2;
a = 1 + ( b3 + 4);
return a;
`;

//解析结束标记
const EOF = undefined;

//Token类型
const TT = {
    num: 'num',
    id: 'id',
    keywords: 'keywords', //var | return 
    lparen: 'lparen',// (
    rparen: 'rparen',// )
    semicolon: 'semicolon', //;
    whitespace: 'whitespace', // \n | \t | \s  (空格，制表符，换行符) 
    plus: 'plus', // +
    assign: 'assign',// =
}

// 状态集类型
const S = {
    start: 'start',
    done: 'done',
    ...TT
}

//判断是否为关键词
const isKeywords = (token) => ['function', 'return', 'if', 'var'].includes(token);

//判断是否为数字
const isDigit = c => /\d/.test(c);

//判断是否为合法的标识符字符
const isValidId = c => /[A-Za-z0-9]/.test(c);

//判断是否为空格
const isBlank = c => /(\s|\t|\n)/.test(c);

/**
 * 词法分析
 */
function tokenize(code) {
    let state = S.start;
    let currentToken;//标记当前寻找到的token
    let index = 0;//起始指针,每次分析指向start状态
    let lookup = 0;//前探指针,每次分析最终指向done状态，start->done之间的字符即为token
    let line = 1;//记录行号
    let col = 1;//记录列号

    while (code[lookup] !== EOF) { //如果还有字符

        while (state !== S.done) { //开始拆分token

            //获取下一个字符
            let c = code[lookup++];
            col++;

            //根据当前状态和下一个字符判断DFA如何跳转
            switch (state) {
                case S.start: //开始为空集
                    if (isDigit(c)) {
                        state = S.num;
                    } else if (isValidId(c)) {
                        state = S.id;
                    } else if (isBlank(c)) {
                        //换行时行号+1，列号置0;
                        if (c === '\n') {
                            line++;
                            col = 1;
                        }
                        state = S.done;
                    } else if (c === '=') {
                        currentToken = [TT.assign, '=']
                        state = S.done;
                    } else if (c === '+') {
                        currentToken = [TT.plus, '+']
                        state = S.done;
                    } else if (c === ';') {
                        currentToken = [TT.semicolon, ';']
                        state = S.done;
                    };
                break;
                case S.num: //如果是整数
                    if (isDigit(c)) {
                        state = S.num;
                    } else {
                        currentToken = [TT.num, code.slice(index,lookup - 1)];
                        lookup -= 1; //从数字状态跳出后，最后一位需要参与下一轮分词，故回退一位
                        state = S.done;
                    }
                break;
                case S.id: //如果是标识符状态
                    if (isValidId(c)) {
                        state = S.id;
                    } else {
                        let tempToken = code.slice(index,lookup - 1);
                        lookup -= 1; //从标识符状态跳出后，最后一位需要参与下一轮分词，故回退一位
                        if (isKeywords(tempToken)) {
                            currentToken = [TT.keywords, tempToken];
                        }else{
                            currentToken = [TT.id, tempToken];
                        }
                        state = S.done;
                    }
                break;                 
            }
        }
        //state = S.done时跳出
        currentToken && console.log(`位置:${line}行${col - (lookup - index)}列 , 分词元组:[${currentToken}]`);
        currentToken = undefined;

        //起指针跟上末指针
        index = lookup;

        //开始下一轮分词
        state = S.start;
    }
}

//运行分词器
tokenize(snippet);
