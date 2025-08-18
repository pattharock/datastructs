export class CircularBuffer {
  #items;
  #head;
  #tail;
  #count;
  #MIN_CAP;

  constructor(label = '') {
    this.#MIN_CAP = 8;
    this.label = label;
    this.#items = new Array(this.#MIN_CAP);
    this.#head = 0;
    this.#tail = 0;
    this.#count = 0;
  }

  #_resize(newCapacity) {
    const newItems = new Array(newCapacity);
    for (let i = 0; i < this.#count; i++) {
      newItems[i] = this.#items[(this.#head + i) % this.#items.length];
    }
    this.#items = newItems;
    this.#head = 0;
    this.#tail = this.#count;
  }

  #_grow() {
    this.#_resize(this.#items.length * 2);
  }

  #_maybeShrink() {
    const currentCapacity = this.#items.length;
    if (currentCapacity > this.#MIN_CAP && this.#count < Math.floor(this.#items.length / 4)) {
      const newCapacity = Math.max(this.#MIN_CAP, Math.floor(this.#items.length / 2));
      this.#_resize(newCapacity);
    }
  }

  pushFront(element) {
    if (this.size() === this.#items.length) this.#_grow();
    this.#head = (this.#head - 1 + this.#items.length) % this.#items.length;
    this.#items[this.#head] = element;
    this.#count++;
  }

  popFront() {
    if (this.isEmpty()) return undefined;
    const toDelete = this.#items[this.#head];
    this.#head = (this.#head + 1) % this.#items.length;
    this.#count--;
    this.#_maybeShrink();
    return toDelete;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#head];
  }

  pushBack(element) {
    if (this.#items.length === this.#count) this.#_grow();
    this.#items[this.#tail] = element;
    this.#tail = (this.#tail + 1) % this.#items.length;
    this.#count++;
  }

  popBack() {
    if (this.isEmpty()) return undefined;
    this.#tail = (this.#tail - 1 + this.#items.length) % this.#items.length;
    const toDelete = this.#items[this.#tail];
    this.#count--;
    this.#_maybeShrink();
    return toDelete;
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.#items[(this.#tail - 1 + this.#items.length) % this.#items.length];
  }

  isEmpty() {
    return this.#count === 0;
  }

  size() {
    return this.#count;
  }

  clear() {
    this.#head = 0;
    this.#tail = 0;
    this.#count = 0;
    this.#items = new Array(this.#MIN_CAP);
  }

  toString() {
    let s = '[';

    for (let i = 0; i < this.#count; i++) {
      s = `${s} ${this.#items[(this.#head + i) % this.#items.length]}`;
    }

    return `${s} ]`;
  }
}
