var cSet = require('./set.js');
var linkedList = require('./linkedList.js');

class set92 extends cSet {
    constructor(props){
        super(props);
        this.dataStore = new linkedList();
    }
    
    //@override the add method
    add(value){
        if (!this.dataStore.find(value)) {
            this.dataStore.insert('head',value);
        }
    }

    show(){
       return this.dataStore.display();
    }
}

var myset = new set92();

myset.add(6);
myset.add(18);
myset.add(5);
myset.add(1);
myset.add(18);

console.log(myset.show());

