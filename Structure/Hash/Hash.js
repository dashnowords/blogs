class Hash{
    constructor(num){
        this.table = new Array(num);
    }

    put(data){
        var pos = this.betterHash(data);
        this.table[pos] = data;
    }

    simpleHash(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += data.charCodeAt(i);
            return total % this.table.length;
        }
    }

    betterHash(data){
        const H = this.table.length;
        var total = 0;
        for(var i =0; i < data.length; i++){
            total += H * total + data.charCodeAt(i);
        }
        total = total % this.table.length;
        if (total < 0){
            total += this.table.length - 1;
        }
        return parseInt(total);
    }

    show(){
        var n = 0;
        for(var i = 0; i < this.table.length; i++){
            if (this.table[i] !== undefined) {
                console.log(i+':'+this.table[i]);
            }
        }
    }
}
module.exports = Hash;