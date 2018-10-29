var Dictionary = require('./Dictionary');
var fs = require('fs');
var readline = require('readline');

var dic = new Dictionary();

const rl = readline.createInterface({
    input:fs.createReadStream('./telephone.txt')
});

rl.on('line',(line)=>{
    let [name, telephone] = line.split(/\s+/);
    dic.add(name, telephone);
});

rl.on('close',()=>{
    console.log('显示所有电话:');
    dic.showAll();
    console.log('查找小张的电话:');
    console.log(dic.find('小张'));
    console.log('新增小米的电话:');
    dic.add('小米','1mm1mmm1mmm');
    dic.showAll();
    console.log('删除小明的电话:');
    dic.remove('小明');
    dic.showAll();
    console.log('清空电话簿!');
    dic.clear();
    console.log('电话簿:');
    dic.showAll();
});


