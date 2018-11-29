/**
 * 快速排序示例代码
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[0];
    let left = [];
    let right = [];
    for(let i = 1; i < arr.length; i++){
        if (arr[i] >= pivot) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot).concat(quickSort(right));
}

let arr = [72,54,58,30,31,78,2,77,82,72];
console.log(quickSort(arr));
