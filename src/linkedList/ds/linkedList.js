import { defaultEquals } from '../../../utils/index.js';
import { Node } from '../../models/ds/linkedListNode.js';

export class LinkedList {
  count;
  head;

  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  getElementAt(index) {
    if (index < 0 || index > this.count - 1) return undefined;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  remove(element) {
    if (!this.head) return undefined;

    let previous;
    let current = this.head;

    if (this.equalsFn(this.head.element, element)) {
      const toDelete = this.head;
      this.head = this.head.next;
      toDelete.next = null;
      this.count--;
      return toDelete;
    }

    while (current.next && !this.equalsFn(current.element, element)) {
      previous = current;
      current = current.next;
    }

    if (this.equalsFn(element, current.element)) {
      const toDelete = current;
      previous.next = current.next;
      toDelete.next = null;
      this.count--;
      return toDelete;
    }

    return undefined;
  }

  removeAt(index) {
    if (index < 0 || index >= this.count) return undefined;

    this.count--;
    if (index === 0) {
      const toDelete = this.head;
      this.head = this.head.next;
      toDelete.next = null;
      return toDelete;
    }

    let previous;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }

    const toDelete = current;
    previous.next = current.next;

    toDelete.next = null;
    return toDelete;
  }

  push(element) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }

    this.count++;
  }

  insert(element, index) {
    if (index < 0 || index > this.count) return false;

    const node = new Node(element);
    this.count++;

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let previous;
      let current = this.head;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }

      previous.next = node;
      node.next = current;
    }

    return true;
  }

  indexOf(element) {
    let index = 0;
    let current = this.head;

    while (current) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (!this.getHead()) return ';';

    let objString = `[${this.head.element}`;

    let current = this.head.next;
    while (current !== null) {
      objString += ` ${current.element}`;
      current = current.next;
    }

    return objString + `]`;
  }
}
