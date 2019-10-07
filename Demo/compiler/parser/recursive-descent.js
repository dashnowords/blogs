/**
 * 文法定义-生产规则
 * Program -> Statement
 * P -> S
 * 
 * 语句 -> 块状语句 | if语句 | return语句 | 声明 | 表达式 |......
 * Statement -> BlockStatement | IfStatement | ReturnStatement | Declaration | Expression |......
 * S -> B | I | R | D | E
 * 
 * B -> { Statement }
 * 
 * I -> if ( ExpressionStatement ) { Statement }
 * 
 * R -> return Expression | null
 * 
 * 声明 -> 函数声明 | 变量声明
 * Declaration -> FunctionDeclaration | VariableDeclaration
 * D -> F | V
 * 
 * F -> function ID ( SequenceExpression ) { ... }
 * 
 * V -> 'var | let | const' ID [= Expression | Null] ?
 * 
 * 表达式 -> 赋值表达式 | 序列表达式 | 一元运算表达式 | 二元运算表达式 |......
 * Expression -> AssignmentExpression | SequenceExpression | UnaryExpression | BinaryExpression | BracketExpression......
 * E -> A | Seq | U | BI | BRA |...
 * 
 * A -> E = E //赋值表达式
 * 
 * Seq -> ID,ID,ID//类似形式
 * 
 * //一元表达式
 * U -> "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" E
 * 
 * //二元表达式
 * BI -> E "==" | "!=" | "===" | "!=="
         | "<" | "<=" | ">" | ">="
         | "<<" | ">>" | ">>>"
         | "+" | "-" | "*" | "/" | "%"
         | "|" | "^" | "&" | "in"
         | "instanceof" | ".."  E
 * 
 * //括号表达式
 * BRA -> ( E )
 * 
 * N -> null  
 */
let snippet = `
var b3 = 2;
a = 1 + ( b3 + 4);
return a;
`;

let tokens = [ [ 'keywords', 'var' ],
[ 'id', 'b3' ],
[ 'assign', '=' ],
[ 'num', '2' ],
[ 'semicolon', ';' ],
[ 'id', 'a' ],
[ 'assign', '=' ],
[ 'num', '1' ],
[ 'plus', '+' ],
[ 'lparen', '(' ],
[ 'id', 'b3' ],
[ 'plus', '+' ],
[ 'num', '4' ],
[ 'rparen', ')' ],
[ 'semicolon', ';' ],
[ 'keywords', 'return' ],
[ 'id', 'a' ],
[ 'semicolon', ';' ]];

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
    minus: 'minus', //-
    assign: 'assign',// =
    lbracket: 'lbracket',// {
    rbracket: 'rbracket', // }
    null:'null' // null
}

//解析结束标记
const EOF = undefined;
const CRLF = 'semicolon';

parse(tokens);

 /**parser */
function parse(tokens) {
    let buffer = nextStatement(tokens);
    let flag = true;

    while (buffer && flag){

       if (!S(buffer)) {
           console.log('检测到不符合语法的tokens序列');
           flag = false;
       } 
       buffer = nextStatement(tokens);
    }   
    
    //如果没有出错则提示正确
    flag && console.log('检测结束，被检测tokens序列是合法的代码段');
}

//将下一个Statement全部读入缓冲区
function nextStatement(tokens) {
    let result = [];
    let token;

    while(tokens.length) {
        token = tokens.shift();
        result.push(token);
        //如果不是换行符则
        if (token[0] === CRLF) {
            break;
        }
    }

    return result.length ? result : null;
}

//判断是否为Statement
function S(tokens) {
    //把结尾的分号全部去除
    while(tokens[tokens.length - 1][0] === TT.semicolon){
        tokens.pop();
    }
    return B(tokens) || I(tokens) || R(tokens) || D(tokens) || E(tokens);
}

//判断是否为BlockStatement  B -> { Statement } (本例中并不涉及本方法，故暂不考虑末尾分号和文法递归的情况)
function B(tokens) {
     //本例中不涉及，直接返回false
    return false;
}

//判断是否为IfStatement I -> if ( ExpressionStatement ) { Statement }
function I(tokens) {
    //本例中不涉及，直接返回false
    return false;
}
//判断是否为ReturnStatement  R -> return Expression | null
function R(tokens) {
    return isReturn(tokens[0]) && (E(tokens.slice(1)) || N(tokens.slice(1)[0]));
}

//判断是否为声明语句 Declaration -> FunctionDeclaration | VariableDeclaration
function D(tokens) {
    return F(tokens) || V(tokens);
}

//判断是否为函数声明  F -> function ID ( SequenceExpression ) { ... }
function F(tokens) {
    //本例中不涉及，直接返回false
    return false;
}

//判断是否为变量声明  V -> 'var | let | const' ID [= Expression | Null] ?
function V(tokens) {
    //判断为1.单纯的声明 还是 2.带有初始值的声明
    if (tokens.length === 2) {
        return isVariableDeclarationKeywords(tokens[0]) && tokens[1][0] === TT.id;
    }
    return isVariableDeclarationKeywords(tokens[0]) && (A(tokens.slice(1))) || N(tokens.slice(1));
}

//判断是否为表达式 E -> A | Seq | U | BI | BRA |...
function E(tokens) {
    return ID(tokens) || A(tokens) || Seq(tokens) || U(tokens) || BI(tokens) || BRA(tokens);
}

//赋值语句右侧表达式,避免进入A函数左递归
function E_(tokens) {
    return IDNUM(tokens) || Seq(tokens) || U(tokens) || BI(tokens) || BRA(tokens);
}

//判断是否为id
function ID(tokens) {
    return tokens.length === 1 && tokens[0][0] === TT.id ;
}

//判断是否为id或num
function IDNUM(tokens) {
    return tokens.length === 1 && (tokens[0][0] === TT.id || tokens[0][0] === TT.num);
}

//判断是否为赋值表达式 A -> E = E 
function A(tokens) {
    return tokens[0][0] === TT.id && tokens[1][0] === TT.assign && E_(tokens.slice(2));
}

//判断是否为逗号表达式
function Seq(tokens) {
    //本例中不使用,直接返回false
    return false;
}

//一元运算表达式(只实现了一元加和一元减)
function U(tokens) {

   if (!tokens.length) {
       return false;
   }
   return (tokens[0][0] === TT.plus || tokens[0][0] === TT.minus) && E(tokens.slice(1));
}

//二元运算表达式(只实现了加和减)
function BI(tokens) {
    return tokens.length > 2 && (tokens[0][0] === TT.id || tokens[0][0] === TT.num) && (tokens[1][0] === TT.plus || tokens[1][0] === TT.minus) && E_(tokens.slice(2));
}

//括号表达式
function BRA(tokens) {
    return tokens[0][0] === TT.lparen && tokens[tokens.length - 1][0] === TT.rparen && E(tokens.slice(1,tokens.length - 1));
}

//判断是否为变量声明的关键词
function isVariableDeclarationKeywords(token) {
    return token[0] === TT.keywords && (token[1] === 'var' || token[1] === 'let' || token[1] === 'const');
}

//是否为关键词return
function isReturn(token) {
    return token[0] === TT.keywords && token[1] === 'return';
}

//是否为保留字null
function N(token) {
    return token[0] === TT.null; 
}

