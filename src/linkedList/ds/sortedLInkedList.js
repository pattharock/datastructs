import { LinkedList } from './linkedList.js';
import { Node } from '../../models/ds/linkedListNode.js';

const Compare = {
  LESS_THAN: -1,
  GREATER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a == b) return 0;
  return a < b ? Compare.LESS_THAN : Compare.GREATER_THAN;
}

export class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultCompare, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  getInsertionIndex(element) {
    if (this.size() === 0) return 0;

    let current = this.head;
    let index = 0;

    while (current) {
      const comparison = this.compareFn(element, current.element);
      if (comparison === Compare.LESS_THAN) {
        return index;
      }
      current = current.next;
      index++;
    }

    return index;
  }

  insert(element) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    const insertionIndex = this.getInsertionIndex(element);
    return super.insert(element, insertionIndex);
  }

  isEmpty() {
    return this.count === 0;
  }
}
