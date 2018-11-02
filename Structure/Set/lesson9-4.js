var cSet = require('./set.js');

class set94 extends cSet {
  
    //@override the add method
    add(value){
        let flag = false;
        for(let item of this.dataStore){
            if (item === value) {
                flag = true;
                break;
            }
        }
        !flag && this._add(value);
    }

    _add(value){
        let i = 0;
        while(value > this.dataStore[i]){
             i++;
        }
        this.dataStore.splice(i,0,value);
    }

    lower(element){
        let i = 0;
        while(element > this.dataStore[i] && i < this.dataStore.length){
             i++;
        }
        return this.dataStore[i-1];
    }
}

var myset = new set94();

myset.add(6);
myset.add(18);
myset.add(5);
myset.add(1);

console.log(myset.lower(17));

