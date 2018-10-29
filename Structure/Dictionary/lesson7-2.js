var Dictionary = require('./Dictionary');

function countWords (sentence) {
    var dic = new Dictionary();
    var wordsArr = sentence.split(/\s+/);
    wordsArr.forEach(function (item, index) {
        if (dic.find(item)) {
            dic.datastore[item] += 1;
        }else{
            dic.add(item,1);
        }
    });
    dic.showAll();
}

let x = 'the brown fox jumped over the blue fox';
countWords(x);
