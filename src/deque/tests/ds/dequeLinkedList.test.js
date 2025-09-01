import { describe, it, expect, beforeEach } from 'vitest';
import { Deque } from '../../ds/dequeLinkedList.js';

describe('Deque', () => {
  /** @type {Deque} */
  let deque;

  beforeEach(() => {
    deque = new Deque('testDeque');
  });

  it('starts empty', () => {
    expect(deque.size()).toBe(0);
    expect(deque.isEmpty()).toBe(true);
    expect(deque.peekFront()).toBeUndefined();
    expect(deque.peekBack()).toBeUndefined();
    expect(deque.popFront()).toBeUndefined();
    expect(deque.popBack()).toBeUndefined();
  });

  it('pushBack adds elements to the back', () => {
    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.size()).toBe(2);
    expect(deque.isEmpty()).toBe(false);

    expect(deque.peekFront().element).toBe(1);
    expect(deque.peekBack().element).toBe(2);
  });

  it('pushFront adds elements to the front', () => {
    deque.pushBack(2);
    deque.pushFront(1);

    expect(deque.size()).toBe(2);
    expect(deque.peekFront().element).toBe(1);
    expect(deque.peekBack().element).toBe(2);
  });

  it('popFront removes elements from the front', () => {
    deque.pushBack('a');
    deque.pushBack('b');
    deque.pushBack('c');

    expect(deque.popFront().element).toBe('a');
    expect(deque.popFront().element).toBe('b');
    expect(deque.popFront().element).toBe('c');
    expect(deque.popFront()).toBeUndefined();
    expect(deque.isEmpty()).toBe(true);
  });

  it('popBack removes elements from the back', () => {
    deque.pushBack('x');
    deque.pushBack('y');
    deque.pushBack('z');

    expect(deque.popBack().element).toBe('z');
    expect(deque.popBack().element).toBe('y');
    expect(deque.popBack().element).toBe('x');
    expect(deque.popBack()).toBeUndefined();
    expect(deque.isEmpty()).toBe(true);
  });

  it('peekFront and peekBack do not remove elements', () => {
    deque.pushBack(10);
    deque.pushBack(20);

    expect(deque.peekFront().element).toBe(10);
    expect(deque.peekBack().element).toBe(20);
    expect(deque.size()).toBe(2);
  });

  it('clear empties the deque', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushFront(0);

    deque.clear();

    expect(deque.size()).toBe(0);
    expect(deque.isEmpty()).toBe(true);
    expect(deque.peekFront()).toBeUndefined();
    expect(deque.peekBack()).toBeUndefined();
  });

  it('toString returns space-separated representation', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);

    const str = deque.toString();
    expect(str).toBe('1 2 3');
  });

  it('handles mixed operations correctly', () => {
    deque.pushBack(2);
    deque.pushFront(1);
    deque.pushBack(3);

    expect(deque.toString()).toBe('1 2 3');
    expect(deque.popBack().element).toBe(3);
    expect(deque.popFront().element).toBe(1);
    expect(deque.toString()).toBe('2');
  });
});
