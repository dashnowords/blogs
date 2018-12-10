/**
 * 根据补丁包更新视图
 */

function addPatch(oldTree, patches) {
   let globalIndex = 0; //遍历时为节点添加索引，方便打补丁时找到节点
   dfsPatch(oldTree, patches, globalIndex);//patches会以传址的形式进行递归，所以不需要返回值
}

//深度遍历节点打补丁
function dfsPatch(oldNode, patches, index) {
    let nextIndex = index + 1;
    //如果有补丁则打补丁
    if (patches[index] !== undefined) {
        //刷新当前虚拟节点对应的DOM
        changeDOM(oldNode.el,patches[index]);
    }
    //如果有自子节点且子节点是Element实例则递归遍历
    if (oldNode.children.length && oldNode.children[0] instanceof Element) {
        for(let i =0 ; i< oldNode.children.length; i++){
           nextIndex = dfsPatch(oldNode.children[i], patches, nextIndex);
        }
    }
    return nextIndex;
}

//依据补丁类型修改DOM
function changeDOM(el, patches) {
    patches.forEach(function (patch, index) {
        switch(patch.type){
            //改变属性
            case 'ChangeProps':
               patch.props.forEach(function (prop, index) {
                   switch(prop.type){
                      case 'NEW':
                      case 'MOD':
                          el.setAttribute(prop.propName, prop.value);
                      break;
                      case 'DEL':
                          el.removeAttribute(prop.propName);
                      break;
                   }
               })
            break;
            //
            case 'ChangeInnerText':
                 el.innerHTML = patch.value;
            break;
            case 'Replace':
                let newel = h(patch.node.tag, patch.node.props, patch.node.children).render(); 
                el.parentNode.replaceChild(newel , el);
        }
    })
}
