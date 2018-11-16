/**
 * 模板编译器
 */
class Compiler{
    constructor(){
       this.strategy = new Strategy();
       this.strategyKeys = Object.keys(this.strategy);
    }

    //编译
    compile(vm, node){
        if (node.nodeType === 3) {//解析文本节点
            this.compileTextNode(vm, node);
        }else{
            this.compileNormalNode(vm, node);
        }
    }

    // 编译文本节点
    compileTextNode(vm, node){}

    //编译普通节点
    compileNormalNode(vm, node){
         this.strategyKeys.forEach(key=>{
            let expr = node.getAttribute(key);
            if (expr) {
                //如果有这个属性
                this.strategy[key].call(vm, node, expr);
            }
        });
        //递归
        let childs = node.childNodes;
        if (childs.length > 0) {
            childs.forEach(subNode => this.compile(vm, subNode));
        }
    }
}

window.Compiler = new Compiler();