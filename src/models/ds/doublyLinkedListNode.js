import { Node } from './linkedListNode.js';

export class DoubleNode extends Node {
  constructor(element, next, prev = null) {
    super(element, next);
    this.prev = prev;
  }

  toString() {
    return `${this.element}`;
  }
}
