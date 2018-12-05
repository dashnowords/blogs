/**
 * 动态规划求解最长公共子串
 * @param  {[type]} str1 [description]
 * @param  {[type]} str2 [description]
 * @return {[type]}      [description]
 */
function lcs(str1,str2) {
    let record = [];
    let max = 0;
    let pos = 0;
    let result = '';
    //初始化记录图
    for(let i = 0; i < str1.length; i++){
        record[i] = [];
        for(let j = 0; j < str2.length; j++){
            record[i][j] = 0;
        }
    }
    //动态规划遍历
    for(let i = 0; i < str1.length; i++){
        for(let j = 0; j < str2.length; j++){
            if (i === 0 || j === 0) {
                record[i][j] = 0;
            }else{
                if (str1[i] === str2[j]) {
                     record[i][j] = record[i-1][j-1] + 1;
                } else {
                     record[i][j] = 0;
                }
            }
            //更新最大值指针
            if (record[i][j] > max) {
                max = record[i][j];
                pos = [i];
            }
        }
    }
    //拼接结果
    if (!max) {
        return '';
    } else {
        for(let i = pos ; i > pos - max ; i--){
            result = str1[i] + result;
        }
        return result;
    }
}

console.log(lcs('havoc','raven'))
console.log(lcs('abbcc','dbbcc'))
