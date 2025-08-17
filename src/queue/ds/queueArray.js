/**
 * Queue data structure implementation using an array.
 * Provides standard queue operations such as enqueue, dequeue, peek, and utility methods.
 *
 * @class Queue
 * @private {Array} #items - Internal array to store queue elements.
 * @property {string} label - Optional label for the queue instance.
 */
export class Queue {
  #items;

  constructor(label = '') {
    this.#items = [];
    this.label = label;
  }

  enqueue(element) {
    this.#items.push(element);
  }

  dequeue() {
    return this.#items.shift();
  }

  peek() {
    return this.#items[0];
  }

  size() {
    return this.#items.length;
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  clear() {
    this.#items = [];
  }

  toString() {
    let s = `[`;
    for (const item of this.#items) {
      s = `${s} ${item.toString()}`;
    }
    return `${s} ]`;
  }
}
