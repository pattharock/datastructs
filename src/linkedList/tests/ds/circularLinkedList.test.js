import { beforeEach, describe, expect, it } from 'vitest';

import { CircularLinkedList } from '../../ds/circularLinkedList.js';

/**@type {CircularLinkedList} */
let cll;
describe('Circular Linked List - functional tests', () => {
  beforeEach(() => {
    cll = new CircularLinkedList();
  });

  it('CLL starts off as empty', () => {
    expect(cll.size()).toBe(0);
    expect(cll.isEmpty()).toBe(true);
    expect(cll.getHead()).toBeUndefined();
    expect(cll.head).toBe(null);
    expect(cll.toString()).toBe('');
  });

  it('PUSH(e) functions as expected', () => {
    expect(cll.isEmpty()).toBe(true);
    expect(cll.size()).toBe(0);
    expect(cll.getHead()).toBeUndefined();
    cll.push(1);
    expect(cll.toString()).toBe('1');
    expect(cll.size()).toBe(1);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );
    cll.push(2);
    expect(cll.toString()).toBe('1 2');
    expect(cll.size()).toBe(2);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );
    cll.push(3);
    expect(cll.toString()).toBe('1 2 3');
    expect(cll.size()).toBe(3);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );

    cll.push(4);
    expect(cll.toString()).toBe('1 2 3 4');
    expect(cll.size()).toBe(4);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );

    cll.push(5);
    expect(cll.toString()).toBe('1 2 3 4 5');
    expect(cll.size()).toBe(5);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );

    cll.push(6);
    expect(cll.toString()).toBe('1 2 3 4 5 6');
    expect(cll.size()).toBe(6);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );
  });
});
