/**
 * @file stackArray.js
 * @module stack/ds/stackArray
 * @description Represents a stack data structure using an internal array.
 * @author Ritvik Singh
 * @copyright Copyright (c) 2024
 * @license MIT
 *
 * Provides standard stack operations such as push, pop, peek, isEmpty, size, clear, and toString.
 * Follows the Last-In-First-Out (LIFO) principle.
 */
export class Stack {
  #items = [];

  push(element) {
    this.#items.push(element);
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  clear() {
    this.#items = [];
  }

  toString() {
    if (this.isEmpty()) return '';
    return this.#items.join(' ');
  }
}
