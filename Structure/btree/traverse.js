var BST = require('./bst');

BST.prototype.inOrderTraverse = function inOrder(node) {
   if (node !== null) {
        inOrder(node.left);
        console.log(node.show()+" ");
        inOrder(node.right);
    }
}

BST.prototype.preOrderTraverse = function preOrder(node) {
    if (node !== null) {
        console.log(node.show() + " ");
        preOrder(node.left);
        preOrder(node.right);
    }
}

BST.prototype.postOrderTraverse = function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + " ");
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
console.log('preorder:');
bst.preOrderTraverse(bst.root);
console.log('preorder:');
bst.postOrderTraverse(bst.root);