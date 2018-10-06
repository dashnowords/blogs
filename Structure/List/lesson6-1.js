//节点
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
        this.pre = null;
    }
}

//链表
class TwoWayLinkedList{
    //定义头节点element属性为'head'，next也指向null,且默认没有激活元素
    constructor(){
        this.head = new Node('head');
        this.activeNode = null;
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
            //暂时忽略尾节点null的处理
            if(itemNode.next){
                itemNode.next.pre = newNode;
            }
            itemNode.next = newNode;
            newNode.pre = itemNode;
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
        let itemNode = this.find(item);
        if(itemNode !== null){
            itemNode.pre.next = itemNode.next;
            itemNode.next.pre = itemNode.pre;
        }
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

    //设置激活节点
    setActive(item){
        let itemNode = this.find(item);
        if (itemNode !== null && itemNode !== this.head) {
             this.activeNode = itemNode;
        } else {
            return '节点不存在';
        }
    }

    //向前移动n个位置
    advance(n){
        let posNode;
        let element;
        if (this.activeNode === null) {
            return '尚未设置激活节点'
        }
         posNode = this.activeNode;
         element= this.activeNode.element;
        //判断位移是否过界
        while(n && posNode.pre !== null){
            posNode = posNode.pre;
            n--;
        }
        //如果n为0则可移动否则为越界
        if (!n) {
          //从原位置删除
          this.remove(this.activeNode.element);
          //从新位置插入
          this.insert(posNode.pre.element, element);
        }else{
            return '新的位置超过了链表长度';
        }
    }
}

//测试插入方法
let link = new TwoWayLinkedList();
link.insert('head',1);
link.insert('head',2);
link.insert('head',3);
link.insert('head',4);
link.insert('head',5);
link.insert('head',6);
link.insert('head',7);
link.insert('head',8);
let fresult = link.display();
console.log(fresult)
//测试前移方法
console.log('测试advance(n)前移函数');
console.log('应该提示未设置焦点：',link.advance(6));
link.setActive(3);
console.log('应该提示超出长度：',link.advance(8));
link.advance(2);
console.log('值为3的节点应该被前移2位：');
console.log(link.display());

