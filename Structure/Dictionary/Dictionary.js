/**
 * Dictionary类定义
 */

class Dictionary{
    constructor(){
        this.datastore = new Array();
    }

    add(key, value){
         this.datastore[key] = value;
    }

    find(key) {
        return this.datastore[key];
    }

    remove(key){
        delete this.datastore[key];
    }

    showAll(){
        if (this.count()) {
            for(let key of Object.keys(this.datastore)){
                console.log(key + "-->" + this.datastore[key]);
            }
        }else{
            console.log('没有记录')
        }
    }

    showSortedAll(){
        if (this.count()) {
            for(let key of Object.keys(this.datastore).sort()){
                console.log(key + "-->" + this.datastore[key]);
            }
        }else{
            console.log('没有记录')
        }
    }

    count(){
        let n = 0;
        for(let key of Object.keys(this.datastore)){
            n++;
        }
        return n;
    }

    clear(){
        this.datastore = new Array();
    }
}

module.exports = Dictionary;