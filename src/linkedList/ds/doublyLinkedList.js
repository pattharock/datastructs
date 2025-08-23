import { defaultEquals } from '../../../utils';
import { DoubleNode } from '../../models/ds/doublyLinkedListNode';
import { LinkedList } from './linkedList';

export class DoublyLinkedList extends LinkedList {
  tail;

  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  push(element) {
    const node = new DoubleNode(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.count++;
    return true;
  }

  insert(element, index) {
    if (index < 0 || index > this.count) return false;

    const node = new DoubleNode(element);

    if (index === 0) {
      if (this.count === 0) {
        this.head = node;
        this.tail = node;
        this.head.next = null;
        this.head.prev = null;
        this.count++;
        return true;
      } else {
        node.prev = null;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        this.count++;
        return true;
      }
    }

    if (index === this.count) {
      this.tail.next = node;
      node.prev = this.tail;
      node.next = null;
      this.tail = node;
      this.count++;
      return true;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    let previous = current.prev;

    previous.next = node;
    node.prev = previous;
    node.next = current;
    current.prev = node;

    this.count++;
    return true;
  }

  removeAt(index) {
    if (!this.head) return undefined;
    if (index < 0 || index > this.count - 1) return undefined;

    if (index === 0) {
      if (this.head === this.tail) {
        const toDelete = this.head;
        toDelete.next = null;
        toDelete.prev = null;
        this.head = null;
        this.tail = null;

        this.count--;
        return toDelete;
      }

      const toDelete = this.head;
      const nextNode = toDelete.next;

      toDelete.prev = null;
      toDelete.next = null;

      nextNode.prev = null;
      this.head = nextNode;

      this.count--;
      return toDelete;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    if (current === this.tail) {
      let previous = current.prev;
      const toDelete = current;

      previous.next = null;
      toDelete.prev = null;
      this.tail = previous;

      this.count--;
      return toDelete;
    }

    let previous = current.prev;
    const toDelete = current;

    previous.next = current.next;
    toDelete.next.prev = previous;

    toDelete.next = null;
    toDelete.prev = null;
    this.count--;
    return toDelete;
  }

  remove(element) {
    if (!this.head) return undefined;

    const eq = this.equalsFn ?? ((a, b) => a === b);

    if (this.head === this.tail && eq(this.head.element, element)) {
      const toDelete = this.head;
      this.head = null;
      this.tail = null;
      this.count--;
      toDelete.prev = null;
      toDelete.next = null;
      return toDelete;
    }

    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (eq(current.element, element)) {
        if (current === this.head) {
          const toDelete = current;
          this.head = this.head.next;
          this.head.prev = null;
          this.count--;
          toDelete.prev = null;
          toDelete.next = null;
          return toDelete;
        }

        if (current === this.tail) {
          const toDelete = current;
          let previous = current.prev;

          previous.next = null;
          toDelete.prev = null;
          toDelete.next = null;

          this.tail = previous;
          this.count--;
          return toDelete;
        }

        const toDelete = current;
        let previous = current.prev;
        let after = current.next;

        previous.next = after;
        after.prev = previous;

        toDelete.prev = null;
        toDelete.next = null;
        this.count--;

        return toDelete;
      } else {
        current = current.next;
      }
    }
  }

  getElementAt(index) {
    if (!this.head) return undefined;
    if (index < 0 || index > this.count - 1) return undefined;
    if (index === 0) return this.head;
    if (index === this.count - 1) return this.tail;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toString() {
    if (!this.head) return '';

    if (this.head === this.tail) return `${this.head.element}`;

    let objString = `${this.head.element}`;

    let current = this.head.next;
    while (current != this.tail) {
      objString += ` ${current.element}`;
      current = current.next;
    }
    return objString + ` ${this.tail.element}`;
  }
}
