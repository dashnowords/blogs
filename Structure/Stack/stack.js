/**
 * 栈的抽象
 */
class Stack {
  constructor() {
    this.stack = [];
  }
  // 入栈
  push(item) {
    return this.stack.push(item)
  }
  // 出栈
  pop() {
    return this.stack.pop()
  }
  // 获取栈顶元素
  peek() {
    return this.stack[this.getCount() - 1]
  }
  // 获取栈容量
  getCount() {
    return this.stack.length
  }
  // 判断是否空栈
  isEmpty() {
    return this.getCount() === 0
  }
}
module.exports = Stack;