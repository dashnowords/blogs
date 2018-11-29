/**
 * 归并排序示例代码
 */
let set1 = [1, 3, 5, 7, 9, 17, 18, 19];
let set2 = [2, 4, 6, 8, 10, 12, 14, 15];

function merge(set1, set2) {
    let result = [];
    let p1 = 0;
    let p2 = 0;
    let index = p1;
    while (p1 < set1.length && p2 < set2.length){
        if (set1[p1] < set2[p2]) {
            result.push(set1[p1++]);
        } else {
            result.push(set2[p2++]);
        }
    }
    result = p1 === set1.length ? result.concat(set2.slice(p2,set2.length)) : result.concat(set1.slice(p1, set1.length));
    return result;
}

function dac(Arr) {
    let left;
    let right;
    let pos;
    let result;
    if (Arr.length === 1) {
        return Arr;
    } else {
        pos = Math.floor(Arr.length / 2);
        left = Arr.slice(0, pos);
        right = Arr.slice(pos, Arr.length);
        result = merge(dac(left), dac(right));
        console.log('merge step:',result);
        return result;
    }
}

unSortArr = [5,2,4,16,7,23,28,56,12,19];
console.log(dac(unSortArr));

