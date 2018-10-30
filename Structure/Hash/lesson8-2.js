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
     */
    constructor(props){
        super(props);
    }

    //存入一个键值对
    putKey(key,value){
        var pos = this.betterHash(key);
        if (this.table[pos] == undefined) {
            this.table[pos] = new Array();
            this.table[pos].push(key,value);
        }else{
            //哈希碰撞时使用拉链法
            this.table[pos].push(key,value);
        }
        
    }

    //查找一个键
    findKey(key){
        var pos = this.betterHash(key);
        if (pos > -1 && this.table[pos] !== undefined) {
            for(var i = 0; i < this.table[pos].length; i+=2){
                if (this.table[pos][i] === key) {
                    return this.table[pos][i+1];
                }
            }
            return false;
        }else{
            return false;
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