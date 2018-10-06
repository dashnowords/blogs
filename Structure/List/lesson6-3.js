//节点
class Node{
    constructor(element){
        this.element = element;
        this.activeNode = null;
        this.next = null;
    }
}

//链表
class LinkedList{
    //定义头节点element属性为'head'，next也指向null
    constructor(){
        this.head = new Node('head');
        this.activeNode = this.head;
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

    //指定一个节点为当前节点
    setActive(item){
        let itemNode = this.find(item);
        if (itemNode !== null && itemNode !== this.head) {
             this.activeNode = itemNode;
        } else {
            return '节点不存在';
        }
    }

    //显示当前激活节点的数据
    show(){
        let result = '当前激活节点的数据为：'+ this.activeNode.element;
        console.log(result);
        return result;
    }
    
}
//测试插入方法
let link = new LinkedList();
link.insert('head',1);
link.insert('head',2);
link.insert('head',3);
link.insert('head',4);
link.insert('head',5);
link.insert('head',6);
link.insert('head',7);
link.insert('head',8);
let fresult = link.display();
//lesson6-3测试
link.setActive(2);
link.show();
link.setActive(10);
link.show();

