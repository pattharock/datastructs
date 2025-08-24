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

    expect(cll.insert(1000, 0)).toBe(true);
    expect(cll.isEmpty()).toBe(false);
    expect(cll.size()).toBe(4);
    expect(cll.getHead()).toEqual(
      expect.objectContaining({
        element: 1000,
      })
    );
    expect(cll.toString()).toEqual('1000 2 1 3');
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

  it('REMOVEAT returns undefined for empty list and out-of-bounds indexes', () => {
    expect(cll.removeAt(0)).toBeUndefined();
    expect(cll.removeAt(1)).toBeUndefined();
    expect(cll.removeAt(-1)).toBeUndefined();

    [10, 20, 30].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(3);
    expect(cll.removeAt(-1)).toBeUndefined();
    expect(cll.removeAt(3)).toBeUndefined();
    expect(cll.removeAt(99)).toBeUndefined();
    expect(cll.toString()).toBe('10 20 30');
  });

  it('REMOVEAT on single-element list clears the list', () => {
    cll.push(42);
    expect(cll.size()).toBe(1);

    const removed = cll.removeAt(0);
    expect(removed).toEqual(expect.objectContaining({ element: 42 }));
    expect(cll.size()).toBe(0);
    expect(cll.isEmpty()).toBe(true);
    expect(cll.getHead()).toBeUndefined();
    expect(cll.head).toBe(null);
    expect(cll.toString()).toBe('');
  });

  it('REMOVEAT removes head (index 0) and re-links the circle', () => {
    [1, 2, 3, 4, 5].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);

    const removed = cll.removeAt(0);
    expect(removed).toEqual(expect.objectContaining({ element: 1 }));
    expect(cll.size()).toBe(4);
    expect(cll.getHead()).toEqual(expect.objectContaining({ element: 2 }));
    expect(cll.toString()).toBe('2 3 4 5');

    let curr = cll.getHead();
    for (let i = 0; i < cll.size() - 1; i++) curr = curr.next;
    expect(curr.next).toBe(cll.getHead());
  });

  it('REMOVEAT removes a middle element and preserves order', () => {
    [10, 20, 30, 40, 50].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);

    const removed = cll.removeAt(2);
    expect(removed).toEqual(expect.objectContaining({ element: 30 }));
    expect(cll.size()).toBe(4);
    expect(cll.toString()).toBe('10 20 40 50');

    expect(cll.getElementAt(0)).toEqual(expect.objectContaining({ element: 10 }));
    expect(cll.getElementAt(1)).toEqual(expect.objectContaining({ element: 20 }));
    expect(cll.getElementAt(2)).toEqual(expect.objectContaining({ element: 40 }));
    expect(cll.getElementAt(3)).toEqual(expect.objectContaining({ element: 50 }));
    expect(cll.getElementAt(4)).toBeUndefined();
  });

  it('REMOVEAT removes the last element (index size-1) and keeps circle valid', () => {
    [1, 2, 3, 4].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(4);

    const removed = cll.removeAt(3);
    expect(removed).toEqual(expect.objectContaining({ element: 4 }));
    expect(cll.size()).toBe(3);
    expect(cll.toString()).toBe('1 2 3');

    let curr = cll.getHead();
    for (let i = 0; i < cll.size() - 1; i++) curr = curr.next;
    expect(curr.next).toBe(cll.getHead());
  });

  it('REMOVEAT can drain the list with repeated removals at head', () => {
    [5, 6, 7].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(3);

    expect(cll.removeAt(0)).toEqual(expect.objectContaining({ element: 5 }));
    expect(cll.size()).toBe(2);
    expect(cll.toString()).toBe('6 7');

    expect(cll.removeAt(0)).toEqual(expect.objectContaining({ element: 6 }));
    expect(cll.size()).toBe(1);
    expect(cll.toString()).toBe('7');

    expect(cll.removeAt(0)).toEqual(expect.objectContaining({ element: 7 }));
    expect(cll.size()).toBe(0);
    expect(cll.isEmpty()).toBe(true);
    expect(cll.getHead()).toBeUndefined();
    expect(cll.toString()).toBe('');
  });

  it('REMOVE returns undefined for empty list and when element not found', () => {
    expect(cll.remove(1)).toBeUndefined();
    [1, 2, 3].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(3);
    expect(cll.remove(999)).toBeUndefined();
    expect(cll.toString()).toBe('1 2 3');
  });

  it('REMOVE on single-element list clears the list', () => {
    cll.push(42);
    expect(cll.size()).toBe(1);
    const removed = cll.remove(42);
    expect(removed).toEqual(expect.objectContaining({ element: 42 }));
    expect(cll.size()).toBe(0);
    expect(cll.isEmpty()).toBe(true);
    expect(cll.getHead()).toBeUndefined();
    expect(cll.head).toBe(null);
    expect(cll.toString()).toBe('');
  });

  it('REMOVE removes head and re-links the circle', () => {
    [1, 2, 3, 4, 5].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);
    const removed = cll.remove(1);
    expect(removed).toEqual(expect.objectContaining({ element: 1 }));
    expect(cll.size()).toBe(4);
    expect(cll.getHead()).toEqual(expect.objectContaining({ element: 2 }));
    expect(cll.toString()).toBe('2 3 4 5');
    let curr = cll.getHead();
    for (let i = 0; i < cll.size() - 1; i++) curr = curr.next;
    expect(curr.next).toBe(cll.getHead());
  });

  it('REMOVE removes a middle element and preserves order', () => {
    [10, 20, 30, 40, 50].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);
    const removed = cll.remove(30);
    expect(removed).toEqual(expect.objectContaining({ element: 30 }));
    expect(cll.size()).toBe(4);
    expect(cll.toString()).toBe('10 20 40 50');
    expect(cll.getElementAt(0)).toEqual(expect.objectContaining({ element: 10 }));
    expect(cll.getElementAt(1)).toEqual(expect.objectContaining({ element: 20 }));
    expect(cll.getElementAt(2)).toEqual(expect.objectContaining({ element: 40 }));
    expect(cll.getElementAt(3)).toEqual(expect.objectContaining({ element: 50 }));
    expect(cll.getElementAt(4)).toBeUndefined();
  });

  it('REMOVE removes the last element and keeps circle valid', () => {
    [1, 2, 3, 4].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(4);
    const removed = cll.remove(4);
    expect(removed).toEqual(expect.objectContaining({ element: 4 }));
    expect(cll.size()).toBe(3);
    expect(cll.toString()).toBe('1 2 3');
    let curr = cll.getHead();
    for (let i = 0; i < cll.size() - 1; i++) curr = curr.next;
    expect(curr.next).toBe(cll.getHead());
  });

  it('REMOVE removes only the first matching element when duplicates exist', () => {
    [5, 6, 7, 6, 8].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(5);
    const removed = cll.remove(6);
    expect(removed).toEqual(expect.objectContaining({ element: 6 }));
    expect(cll.size()).toBe(4);
    expect(cll.toString()).toBe('5 7 6 8');
    const removed2 = cll.remove(6);
    expect(removed2).toEqual(expect.objectContaining({ element: 6 }));
    expect(cll.size()).toBe(3);
    expect(cll.toString()).toBe('5 7 8');
  });

  it('REMOVE can drain the list by removing head repeatedly', () => {
    [9, 10, 11].forEach((v) => cll.push(v));
    expect(cll.size()).toBe(3);
    expect(cll.remove(9)).toEqual(expect.objectContaining({ element: 9 }));
    expect(cll.size()).toBe(2);
    expect(cll.toString()).toBe('10 11');
    expect(cll.remove(10)).toEqual(expect.objectContaining({ element: 10 }));
    expect(cll.size()).toBe(1);
    expect(cll.toString()).toBe('11');
    expect(cll.remove(11)).toEqual(expect.objectContaining({ element: 11 }));
    expect(cll.size()).toBe(0);
    expect(cll.isEmpty()).toBe(true);
    expect(cll.getHead()).toBeUndefined();
    expect(cll.toString()).toBe('');
  });
});
