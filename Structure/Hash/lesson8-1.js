/**
 * 用开放寻址法解决Hash碰撞
 * @type {[type]}
 */
var fs = require('fs');
var readline = require('readline');
var Hash = require('./Hash');

//从文件中读入记录
var rl = readline.createInterface({
    input:fs.createReadStream('./words.txt')
});

//继承哈希类并扩充方法
class NewHash extends Hash{
    /**
     * 构造方法
     * 原Hash.table中存储键
     * 新Hash.values中存储值
     */
    constructor(props){
        super(props);
        this.values = [];//values
    }

    //存入一个键值对
    putKey(key,value){
        var pos = this.betterHash(key);
        if (this.table[pos] == undefined) {
            this.table[pos] = key;
            this.values[pos] = value;
        }else{
            //哈希碰撞时使用开放寻址法
            while(this.table[pos] !== undefined){
                pos++;
            }
            this.table[pos] = key;
            this.values[pos] = value;
        }
        
    }

    //查找一个键
    findKey(key){
        var hash = this.betterHash(key);
        if (hash > -1) {
            for(var i = hash; this.table[i] != undefined; i++){
                if (this.table[i] == key) {
                    return this.values[i];
                }
            }
        }
    }
}

var hash = new NewHash(37);

rl.on('line',(line)=>{
    let temp = line.split('=>');
    hash.putKey(temp[0],temp[1]);
});

rl.on('close',()=>{
    start();
});

function start() {
    hash.show();
   let result = hash.findKey('Jack');
   console.log(result);
}