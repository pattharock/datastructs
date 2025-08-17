/**
 * @file stackArray.js
 * @module stack/ds/stackObject
 * @description Represents a stack data structure using an Object.
 * @author Ritvik Singh
 * @copyright Copyright (c) 2024
 * @license MIT
 *
 * Provides standard stack operations such as push, pop, peek, isEmpty, size, clear, and toString.
 * Follows the Last-In-First-Out (LIFO) principle.
 */
export class Stack {
  #count;
  #items;

  constructor(label = '') {
    this.#count = 0;
    this.#items = {};
    this._label = label;
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this.#count === 0;
  }

  push(elememt) {
    this.#items[this.#count] = elememt;
    this.#count++;
  }

  pop() {
    if (this.#count === 0) return undefined;
    this.#count--;
    const toDelete = this.#items[this.#count];
    delete this.#items[this.#count];
    return toDelete;
  }

  peek() {
    if (this.#count === 0) return undefined;
    return this.#items[this.#count - 1];
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  toString() {
    if (this.isEmpty()) return '';

    let objString = `[${this.#items[0]}`;
    for (let i = 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }

    return `${objString}]`;
  }
}
