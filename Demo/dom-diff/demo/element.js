//节点类
//构建一个节点对象
class Element{
    /**
   * @param {String} tag 'div'
   * @param {Object} props { class: 'item' }
   * @param {Array} children [ Element1, 'text']
   * @param {String} key option
   */
  constructor(tag, props, children, key) {
     this.tag = tag;
     this.props = props;
     if (Array.isArray(children)) {
        this.children = children;
     } else if (typeof children === 'string'){
        this.children = null;
        this.key = children;
     }
     if (key) {this.key = key};
  }

  /**
   * 从虚拟DOM生成真实DOM
   * @return {[type]} [description]
   */
  render(){
     //生成标签
     let el = document.createElement(this.tag);
     let props = this.props;
     
     //添加属性
     for(let attr of Object.keys(props)){
        el.setAttribute(attr, props[attr]);
     }

     //处理子元素
     var children = this.children || [];

     children.forEach(function (child) {
         var childEl = (child instanceof Element)
         ? child.render()//如果子节点是元素，则递归构建
         : document.createTextNode(child);//如果是文本则生成文本节点
         el.appendChild(childEl);
     });

     //将DOM节点的引用挂载至对象上用于后续更新DOM
     this.el = el;
     //返回生成的真实DOM节点
     return el;
  }
}

function h(tag, props, children, key) {
    return new Element(tag, props, children, key);
}

//module.exports = {h};
