import { DoublyLinkedList } from '../../linkedList/ds/doublyLinkedList.js';

export class Queue {
  constructor() {
    this.items = new DoublyLinkedList();
  }

  enqueue(element) {
    return this.items.pushBack(element);
  }

  dequeue() {
    const node = this.items.popFront();
    return node?.element ?? undefined;
  }

  peek() {
    const node = this.items.getElementAt(0);
    return node?.element ?? undefined;
  }

  size() {
    return this.items.count;
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
