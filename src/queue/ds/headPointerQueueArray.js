/**
 * A queue implementation using an array with a head pointer for efficient dequeue operations.
 *
 * This class provides standard queue operations such as enqueue, dequeue, peek, size, isEmpty, clear, and toString.
 * Internally, it uses a private array and a head pointer to avoid shifting elements on dequeue,
 * periodically compacting the array when necessary.
 *
 * @class Queue
 */
export class Queue {
  #items;
  #head;

  constructor(label = '') {
    this.#items = [];
    this.#head = 0;
    this.label = label;
  }

  enqueue(element) {
    this.#items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const dq = this.#items[this.#head++];

    if (this.#head > 64 && this.#head * 2 > this.#items.length) {
      this.#items = this.#items.slice(this.#head, this.#items.length);
      this.#head = 0;
    }

    return dq;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#head];
  }

  size() {
    const size = this.#items.length - this.#head;
    return Math.max(size, 0);
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#head = 0;
    this.#items = [];
  }

  toString() {
    let s = '[';

    for (let i = this.#head; i < this.#items.length; i++) {
      s = `${s} ${this.#items[i]}`;
    }

    return `${s} ]`;
  }
}
