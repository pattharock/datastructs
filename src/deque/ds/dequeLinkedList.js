import { DoublyLinkedList } from '../../linkedList/ds/doublyLinkedList.js';

export class Deque {
  constructor(label = '') {
    this.items = new DoublyLinkedList();
    this.label = label;
  }

  pushBack(element) {
    return this.items.pushBack(element);
  }

  popBack() {
    return this.items.popBack();
  }

  peekBack() {
    return this.items.getElementAt(this.items.size() - 1);
  }

  pushFront(element) {
    return this.items.pushFront(element);
  }

  popFront() {
    return this.items.popFront();
  }

  peekFront() {
    return this.items.getElementAt(0);
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
