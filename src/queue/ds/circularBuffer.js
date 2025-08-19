/**
 * CircularBuffer is a dynamically resizing circular queue implementation.
 * It efficiently supports enqueue and dequeue operations with automatic resizing
 * when the buffer is full or underutilized. The buffer maintains a minimum capacity
 * and periodically checks if it should shrink to save memory.
 *
 * @class CircularBuffer
 */
export class CircularBuffer {
  #items;
  #head;
  #tail;
  #count;

  #MIN_CAP;
  #opsSinceCheck;
  #checkEvery;

  constructor(capacity = 3, label = '') {
    this.#items = new Array(capacity);
    this.#head = 0;
    this.#tail = 0;
    this.#count = 0;
    this.label = label;
    this.#MIN_CAP = 8;
    this.#opsSinceCheck = 0;
    this.#checkEvery = 256;
  }

  _resize(newCapacity) {
    const n = this.#items.length;

    const newItems = new Array(newCapacity);

    for (let i = 0; i < this.#count; i++) {
      newItems[i] = this.#items[(this.#head + i) % n];
    }

    this.#items = newItems;
    this.#head = 0;
    this.#tail = this.#count;
  }

  _grow() {
    this._resize(this.#items.length * 2);
  }

  _maybeShrink() {
    if (++this.#opsSinceCheck < this.#checkEvery) {
      return;
    }
    this.#opsSinceCheck = 0;

    const currentCapacity = this.#items.length;

    if (currentCapacity < this.#MIN_CAP) {
      return;
    }

    if (this.#count < Math.floor(currentCapacity / 4)) {
      const newCapacity = Math.max(this.#MIN_CAP, Math.floor(currentCapacity / 2));
      this._resize(newCapacity);
    }
  }

  enqueue(element) {
    if (this.size() === this.#items.length) this._grow();
    this.#items[this.#tail] = element;
    this.#tail = (this.#tail + 1) % this.#items.length;
    this.#count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const dq = this.#items[this.#head];
    this.#head = (this.#head + 1) % this.#items.length;
    this.#count--;
    this._maybeShrink();
    return dq;
  }

  front() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#head];
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    while (!this.isEmpty()) {
      this.dequeue();
    }
  }

  toString() {
    let s = `[`;

    for (let i = 0; i < this.#count; i++) {
      s = `${s} ${this.#items[(this.#head + i) % this.#items.length]}`;
    }
    return `${s} ]`;
  }
}
