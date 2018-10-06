const CircularLinkedList = require('./circularlinkedList');
let link = new CircularLinkedList();

//装入1-40个号码
init();
//开始报数
start();


//初始化
function init() {
    for(let i = 40;i; i--){
        link.insert('head',i);
    }
}

function start() {
    //设置1号节点为激活
    link.setActive(1);
    let index = 1;
    while(link.count > 2){
        if(index % 3 === 0){
            link.remove(link.activeNode.element);
            console.log('自杀士兵编号：',link.activeNode.element);
            console.log('当前队列:',link.display());
        }
        link.activeNode = link.activeNode.next === link.head ? link.head.next : link.activeNode.next;
        index++;
    }
}
