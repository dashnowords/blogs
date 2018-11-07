var BST = require('./bst');

//二叉搜索树最左侧的节点即为最小值
BST.prototype.getMin = function () {
    let current = this.root;
    while(current.left !== null){
        current = current.left;
    }
    return current.data;
}

//二叉搜索树最右侧的节点即为最大值
BST.prototype.getMax = function () {
    let current = this.root;
    while(current.right !== null){
        current = current.right;
    }
    return current.data;
}

//查找指定值
BST.prototype.search = function (data) {
    var current = this.root;
    while(current !== null){
        if (current.data == data) {
            return current;
        }else if (data < current.data) {
            current = current.left;
        }else {
            current = current.right;
        }
    }
    return null;
}


var bst = new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
console.log('max:',bst.getMax());
console.log('min:',bst.getMin());