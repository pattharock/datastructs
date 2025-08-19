export class Deque {
  #items;
  #head;
  #tail;
  #count;

  constructor(label = '') {
    this.#items = {};
    this.#head = 0;
    this.#tail = 0;
    this.#count = 0;
    this.label = label;
  }

  pushBack(element) {
    this.#count++;
    this.#items[this.#tail] = element;
    this.#tail++;
  }

  popBack() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    this.#tail--;
    const toDelete = this.#items[this.#tail];
    delete this.#items[this.#tail];
    return toDelete;
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#tail - 1];
  }

  pushFront(element) {
    this.#items[--this.#head] = element;
    this.#count++;
  }

  popFront() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const toDelete = this.#items[this.#head];
    delete this.#items[this.#head];
    this.#head++;
    return toDelete;
  }

  peekFront() {
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
    this.#head = 0;
    this.#tail = 0;
    this.#count = 0;
    this.#items = {};
  }

  toString() {
    let s = '[ ';
    for (let i = this.#head; i < this.#tail; i++) {
      if (Object.hasOwn(this.#items, i)) {
        s += `${this.#items[i]} `;
      }
    }
    return s + ']';
  }
}
