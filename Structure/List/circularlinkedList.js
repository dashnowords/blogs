//节点
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

//循环链表
class CircularLinkedList{
    //定义头节点element属性为'head'，next也指向null
    constructor(){
        this.head = new Node('head');
        this.head.next = this.head;
        this.activeNode = null;
        this.count = 0;
    }

    /**
     * 增加节点
     * 在item节点之后增加newItem
     */
    insert(item, newItem){
        let itemNode = this.find(item);
        let newNode;
            newNode = new Node(newItem);
            newNode.next = itemNode.next;
            itemNode.next = newNode;
            this.count++;
    }

    //是否为空表
    isEmpty(){
        return this.head.next === this.head;
    }
    
    //查找item元素的位置
    find(item){
        let node = this.head;
        while(node.element !== item){
            node = node.next;
        }
        return node;
    }

    //删除元素
    remove(item){
        let preNode = this.findPre(item);
        if(preNode !== null){
            preNode.next = preNode.next.next;
            this.count--;
        }
    }

    //寻找元素前一个节点
    findPre(item){
        let node = this.head;
        let preNode = null;
        while(node.element !== item){
            preNode = node;
            node = node.next;
        }
        return preNode;
    }

    //展示链表
    display(){
        let result ='head';
        let node = this.head.next;
        while(node.element !== 'head'){
            result += '-->' + node.element;
            node = node.next;
        }
        return result;
    }

    //设置激活节点
    setActive(item){
        let itemNode = this.find(item);
        if (itemNode !== null && itemNode !== this.head) {
             this.activeNode = itemNode;
        } else {
            return '节点不存在';
        }
    }

    //测试循环指向
    testCircle(){
        let result ='head';
        let times = 1;
        let node = this.head.next;
        while(times < 3){
            result += '-->' + node.element;
            node = node.next;
            if (node.element  === 'head') {
                times += 1;
            }
        }
        return result;
    }
}
module.exports = CircularLinkedList;
//测试插入方法
/*let link = new CircularLinkedList();
link.insert('head',1);
link.insert('head',2);
link.insert('head',3);
//let fresult = link.display();
let fresult = link.testCircle();
console.log(fresult)
//测试删除方法
link.remove(2);
link.remove(3);
//let fresult2 = link.display();
let fresult2 = link.testCircle();
console.log(fresult2)
*/