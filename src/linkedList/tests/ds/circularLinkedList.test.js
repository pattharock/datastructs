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

  it('INSERT(element, index) functions as expected', () => {
    expect(cll.isEmpty()).toBe(true);
    expect(cll.size()).toBe(0);
    expect(cll.getHead()).toBeUndefined();

    expect(cll.insert(200, 1)).toBe(false);

    expect(cll.insert(1, 0)).toBe(true);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(1);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );

    expect(cll.insert(2, 0)).toBe(true);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(2);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.toString()).toEqual('2 1');

    expect(cll.insert(3, 2)).toBe(true);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(3);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.toString()).toEqual('2 1 3');

    expect(cll.insert(3, -1)).toBe(false);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(3);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.toString()).toEqual('2 1 3');

    expect(cll.insert(3, 4)).toBe(false);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(3);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.toString()).toEqual('2 1 3');
  });

  it('GETELEMENTAT returns undefined for empty list and out-of-bounds indexes', () => {
    // empty
    expect(cll.getElementAt(0)).toBeUndefined();
    expect(cll.getElementAt(1)).toBeUndefined();
    expect(cll.getElementAt(-1)).toBeUndefined();

    [10, 20, 30].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(3);

    expect(cll.getElementAt(-1)).toBeUndefined();
    expect(cll.getElementAt(3)).toBeUndefined();
    expect(cll.getElementAt(99)).toBeUndefined();
  });

  it('GETELEMENTAT returns correct elements after pushes', () => {
    [1, 2, 3, 4, 5].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);
    expect(cll.getElementAt(0)).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );
    expect(cll.getElementAt(1)).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.getElementAt(2)).toEqual(
      expect.objectContaining({
        element: 3,
      })
    );
    expect(cll.getElementAt(3)).toEqual(
      expect.objectContaining({
        element: 4,
      })
    );
    expect(cll.getElementAt(4)).toEqual(
      expect.objectContaining({
        element: 5,
      })
    );
  });

  it('GETELEMENTAT works correctly after inserts at head, middle, and tail', () => {
    expect(cll.insert(1, 0)).toBe(true);
    expect(cll.insert(0, 0)).toBe(true);
    expect(cll.insert(2, 2)).toBe(true);
    expect(cll.insert(1_5, 2)).toBe(true);

    expect(cll.size()).toBe(4);
    expect(cll.getElementAt(0)).toEqual(
      expect.objectContaining({
        element: 0,
      })
    );
    expect(cll.getElementAt(1)).toEqual(
      expect.objectContaining({
        element: 1,
      })
    );

    expect(cll.getElementAt(2)).toEqual(
      expect.objectContaining({
        element: 1_5,
      })
    );

    expect(cll.getElementAt(3)).toEqual(
      expect.objectContaining({
        element: 2,
      })
    );
    expect(cll.getElementAt(4)).toBeUndefined();
  });

  it('GETELEMENTAT does not mutate list state', () => {
    [7, 8, 9].forEach((v) => cll.push(v));
    const sizeBefore = cll.size();
    const headBefore = cll.getHead();
    const strBefore = cll.toString();

    expect(cll.getElementAt(0)).toEqual(
      expect.objectContaining({
        element: 7,
      })
    );
    expect(cll.getElementAt(1)).toEqual(
      expect.objectContaining({
        element: 8,
      })
    );
    expect(cll.getElementAt(2)).toEqual(
      expect.objectContaining({
        element: 9,
      })
    );
    expect(cll.getElementAt(3)).toBeUndefined();

    expect(cll.size()).toBe(sizeBefore);
    expect(cll.getHead()).toBe(headBefore);
    expect(cll.toString()).toBe(strBefore);
  });

  it('GETELEMENTAT on single-element list', () => {
    cll.push(42);
    expect(cll.size()).toBe(1);

    expect(cll.getElementAt(0)).toEqual(
      expect.objectContaining({
        element: 42,
      })
    );
    expect(cll.getElementAt(1)).toBeUndefined();
    expect(cll.getElementAt(-1)).toBeUndefined();
  });
});
