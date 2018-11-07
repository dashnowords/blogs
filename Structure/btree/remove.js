var BST = require('./bst');

//删除指定节点
BST.prototype.remove = function (data) {
    let root = removeNode(this.root, data);
}

BST.prototype.inOrderTraverse = function inOrder(node) {
   if (node !== null) {
        inOrder(node.left);
        console.log(node.show()+" ");
        inOrder(node.right);
    }
}


//查找最小节点
function getSmallest(tree) {
    let current = tree;
    while(current.left !== null){
        current = current.left;
    }
    return current.data;
 }

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        //如果是叶节点,直接删除
        if (node.left == null && node.right == null) {
            return null;
        }
        //如果没有左子树
        if (node.left == null) {
            return node.right;
        }
        //如果没有右子树
        if (node.right == null) {
            return node.left;
        }
        //如果有两个子节点,找出右子树中最小的，上浮至当前节点
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;

    }else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    }else{
        node.right = removeNode(node.right, data);
        return node;
    }
}

var bst = new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
bst.inOrderTraverse(bst.root);
bst.remove(37);
console.log('after remove the node 37');
bst.inOrderTraverse(bst.root);

