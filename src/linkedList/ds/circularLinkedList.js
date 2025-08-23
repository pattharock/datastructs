import { defaultEquals } from '../../../utils/index.js';
import { CircularNode } from '../../models/ds/circularLinkedListNode.js';

export class CircularLinkedList {
  constructor(equalsfn = defaultEquals) {
    this.head = null;
    this.count = 0;
    this.equalsfn = equalsfn;
  }

  push(element) {
    const node = new CircularNode(element);

    if (!this.head) {
      this.head = node;
      node.next = this.head;
      this.count++;
      return true;
    }

    let current = this.head.next;
    while (current.next != this.head) {
      current = current.next;
    }

    current.next = node;
    node.next = this.head;
    this.count++;
    return true;
  }

  getHead() {
    return this.head ?? undefined;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  toString() {
    if (!this.head) return ``;

    let strObject = `${this.head.element.toString()}`;

    if (this.count === 1) {
      return strObject;
    }

    let current = this.head.next;
    while (current.next != this.head) {
      strObject += ` ${current.element.toString()}`;
      current = current.next;
    }

    return `${strObject} ${current.element.toString()}`;
  }
}

const a = new CircularLinkedList();
