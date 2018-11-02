//节点
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

//链表
class LinkedList{
    //定义头节点element属性为'head'，next也指向null
    constructor(){
        this.head = new Node('head');
    }

    /**
     * 增加节点
     * 在item节点之后增加newItem
     */
    insert(item, newItem){
        let itemNode = this.find(item);
        let newNode;
        if (itemNode !== null) {
            newNode = new Node(newItem);
            newNode.next = itemNode.next;
            itemNode.next = newNode;
        }
    }

    //是否为空表
    isEmpty(){
        return this.head.next === null;
    }
    
    //查找item元素的位置
    find(item){
        let node = this.head;
        while(node !== null && node.element !== item){
            node = node.next;
        }
        return node;
    }

    //删除元素
    remove(item){
        let preNode = this.findPre(item);
        if(preNode !== null){
            preNode.next = preNode.next.next;
        }
    }

    //寻找元素前一个节点
    findPre(item){
        let node = this.head;
        let preNode = null;
        while(node !== null && node.element !== item){
            preNode = node;
            node = node.next;
        }
        return preNode;
    }

    //展示链表
    display(){
        let result ='head';
        let node = this.head.next;
        while(node !== null){
            result += '-->' + node.element;
            node = node.next;
        }
        return result;
    }
}

module.exports = LinkedList;
//测试插入方法
/*let link = new LinkedList();
link.insert('head',1);
link.insert('head',2);
link.insert('head',3);
let fresult = link.display();
console.log(fresult)
//测试删除方法
link.remove(2);
link.remove(3);
let fresult2 = link.display();
console.log(fresult2)
*/