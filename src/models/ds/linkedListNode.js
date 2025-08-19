export class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }

  toString() {
    return `${this.element}`;
  }
}
