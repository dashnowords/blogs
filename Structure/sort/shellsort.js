/**
 * 希尔排序示例代码
 */
function shellSort(gaps, arr) {
    for(let g = 0; g < gaps.length; g++){
        let h = gaps[g];
        for(let i = gaps[h]; i < arr.length ; i++){
            for(let j = i; j >= h; j = j - h){
                if (arr[j] < arr[j-h]) {
                    swap(arr, j, j-h);
                }
            }
        }
    }
}

function swap(arr, a, b) {
    let temp;
    temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

let arr = [72,54,58,30,31,78,2,77,82,72];
let gaps = [5,3,1];
shellSort(gaps,arr);
console.log(arr);
