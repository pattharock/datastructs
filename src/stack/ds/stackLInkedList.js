import { DoublyLinkedList } from '../../linkedList/ds/doublyLinkedList.js';

export class Stack {
  constructor() {
    this.items = new DoublyLinkedList();
  }

  push(element) {
    this.items.insert(element, 0);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(0)?.element;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items.getElementAt(0)?.element;
  }

  size() {
    return this.items.size();
  }

  isEmpty() {
    return this.items.isEmpty();
  }

  clear() {
    this.items = new DoublyLinkedList();
  }

  toString() {
    return this.items.toString();
  }
}
