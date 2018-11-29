/**
 * 贪心算法寻找公共子串
 */
function greedy_lsc(str1, str2) {
    //保证str2是长度较短的序列
    if (str1.length < str2.length) {
        let temp = str1;
        str1 = str2;
        str2 = temp;
    }
    let stepLength = str2.length;
    //从长到短枚举
    while(stepLength >= 0){
        for(let i = 0; i < str2.length - stepLength; i++){
            //相当于拿一个不断缩短的尺子逐段截取来查看截取的片段是否被长字符串包含，
            //一旦找到则就是最长公共子串
            let checking = str2.slice(i, i+stepLength);
            if (contains(str1,checking)) {
                return checking;
            }
        }
        stepLength--;
    }
}

//str2是否是str1的子串
function contains(str1, str2) {
    return str1.indexOf(str2) !== -1;
}

//测试
let str1 = 'aabcdefsssefce';
let str2 = 'abssefsssse';

console.log(greedy_lsc(str1,str2));