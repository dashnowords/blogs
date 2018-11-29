/**
 * 贪心算法求解零钱问题
 * 要求：不能使用10美分
 */

function makeChange(money, coins) {
    let remain = money;
    if (remain / 25 > 0) {
        coins[2] = parseInt(remain / 25, 10);
        remain = remain - coins[2]*25;
    }
    if (remain / 5 > 0) {
        coins[1] = parseInt(remain / 5 , 10);
        remain = remain - coins[1]*5;
    }
    coins[0] = remain;
}

/**
 * 显示结果
 */
function showChange(coins) {
   if (coins[2] > 0) {
     console.log('25美分-' + coins[2]);
   }
   if (coins[1] > 0) {
     console.log('5美分-' + coins[1]);
   }
    if (coins[0] > 0) {
     console.log('1美分-' + coins[0]);
   }
}

var origAmt = 30;
var coins = [];
makeChange(origAmt, coins);
showChange(coins);