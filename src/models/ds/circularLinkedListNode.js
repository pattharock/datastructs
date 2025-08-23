import { Node } from './linkedListNode.js';

export class CircularNode extends Node {
  constructor(element, next = null) {
    super(element, next);
  }
}
