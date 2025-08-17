export class Deque {
  #items;

  constructor(label = '') {
    this.#items = [];
    this.label = label;
  }

  pushBack(element) {
    this.#items.push(element);
  }

  popBack() {
    return this.#items.pop();
  }

  peekBack() {
    return this.#items[this.#items.length - 1];
  }

  pushFront(element) {
    this.#items.unshift(element);
  }

  popFront() {
    return this.#items.shift();
  }

  peekFront() {
    return this.#items[0];
  }

  size() {
    return this.#items.length;
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  clear() {
    while (!this.isEmpty()) {
      this.popBack();
    }
  }

  toString() {
    let s = `[`;

    for (let i = 0; i < this.#items.length; i++) {
      s = `${s} ${this.#items[i]}`;
    }

    return `${s} ]`;
  }
}
