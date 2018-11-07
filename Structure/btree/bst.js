//树的节点
class Node{
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
    }
    show(){
        return this.data;
    }
}

//BST
class BST{
    constructor(){
        this.root = null;
    }

    //插入数据
    insert(data){
        var node = new Node(data, null, null);
        if (this.root == null) {
            this.root = node;
        }else{
            var current = this.root;
            var parent;
            while(true){
                parent = current;
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
}

module.exports = BST;