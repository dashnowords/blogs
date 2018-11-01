//避免覆盖原生Set类
class cSet{
    constructor(){
        this.dataStore = [];
    }

    //添加元素
    add(value){
        let flag = false;
        for(let item of this.dataStore){
            if (item === value) {
                flag = true;
                break;
            }
        }
        !flag && this.dataStore.push(value);
    }

    //移除元素
    remove(value){
        let pos = this.dataStore.indexOf(value);
        if (pos > -1) {
            this.dataStore.splice(pos, 1);
            return true;
        }else{
            return false;
        }
    }

    //显示集合成员
    show(){
        return this.dataStore;
    }

    //求并集
    union(setb){
         if (setb instanceof cSet) {
            let result = new cSet();
            for (let item of this.dataStore){
                result.add(item);
            }
            for (let item of setb.dataStore){
                result.add(item);
            }
            return result;
         }else{
            console.log('the params should be instance of cSet');
            return false;
         }
    }

    //求交集
    intersect(setb){
        if (setb instanceof cSet) {
            let result = [];
            for(let item of this.dataStore){
                if (setb.dataStore.some((temp)=>temp === item)) {
                    result.push(item);
                }
            }
            return result;
        }else{
            console.log('the params should be instance of cSet');
            return false;
        }
    }

    //求差集
    difference(setb){
        if (setb instanceof cSet) {
            let result = [];
            for(let item of this.dataStore){
                if (!setb.dataStore.some((temp)=>temp === item)) {
                    result.push(item);
                }
            }
            return result;
        }else{
            console.log('the params should be instance of cSet');
            return false;
        }
    }
    
    
}

module.exports = cSet;