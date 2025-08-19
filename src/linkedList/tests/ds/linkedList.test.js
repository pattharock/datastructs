import { describe, it, expect } from 'vitest';

import { LinkedList } from '../../ds/linkedList.js';

describe('LinkedList - Functional Tests', () => {
  it('push adds elements in order', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    expect(list.size()).toBe(3);
    expect(list.getElementAt(0).element).toBe(1);
    expect(list.getElementAt(2).element).toBe(3);
    expect(list.toString()).toBe('[1 2 3]');
  });

  it('removeAt removes by index', () => {
    const list = new LinkedList();
    list.push('a');
    list.push('b');
    list.push('c');

    const removed = list.removeAt(1);
    expect(removed.element).toBe('b');
    expect(list.size()).toBe(2);
    expect(list.getElementAt(1).element).toBe('c');
    expect(list.toString()).toBe('[a c]');
  });

  it('remove removes head element correctly', () => {
    const list = new LinkedList();
    expect(list.remove(20)).toBeUndefined();

    list.push(10);
    list.push(20);
    list.push(30);

    const removed = list.remove(10);
    expect(removed.element).toBe(10);
    expect(list.size()).toBe(2);
    expect(list.getHead().element).toBe(20);
    expect(list.toString()).toBe('[20 30]');
  });

  it('insert inserts at head, middle, and tail', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(3);

    expect(list.insert(2, 1)).toBe(true);
    expect(list.getElementAt(1).element).toBe(2);

    expect(list.insert(0, 0)).toBe(true);
    expect(list.getHead().element).toBe(0);

    expect(list.insert(4, list.size())).toBe(true);
    expect(list.getElementAt(list.size() - 1).element).toBe(4);
    expect(list.toString()).toBe('[0 1 2 3 4]');
  });

  it('indexOf returns correct index or -1', () => {
    const list = new LinkedList();
    list.push(10);
    list.push(20);
    list.push(30);

    expect(list.indexOf(10)).toBe(0);
    expect(list.indexOf(20)).toBe(1);
    expect(list.indexOf(30)).toBe(2);
    expect(list.indexOf(99)).toBe(-1);
    expect(list.toString()).toBe('[10 20 30]');
  });

  it('remove removes element by value', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    const removed = list.remove(2);
    expect(removed.element).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.indexOf(2)).toBe(-1);
    expect(list.toString()).toBe('[1 3]');
  });
});

describe('LinkedList - Edge Cases', () => {
  it('returns undefined for invalid indices', () => {
    const list = new LinkedList();
    expect(list.removeAt(0)).toBeUndefined();
    expect(list.getElementAt(-1)).toBeUndefined();
    expect(list.getElementAt(1)).toBeUndefined();
    expect(list.insert(1, 5)).toBe(false);
    expect(list.toString()).toBe(';');
  });

  it('works correctly with single element list', () => {
    const list = new LinkedList();
    list.push(42);

    expect(list.getHead().element).toBe(42);
    expect(list.toString()).toBe('[42]');
    expect(list.removeAt(0).element).toBe(42);
    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toString()).toBe(';');
  });

  it('remove returns undefined if element not found', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);

    expect(list.remove(99)).toBeUndefined();
    expect(list.toString()).toBe('[1 2]');
  });
});

describe('LinkedList - Random/Stress Tests', () => {
  it('random sequence of pushes and removes keeps consistency', () => {
    const list = new LinkedList();
    const arr = [];

    for (let i = 0; i < 20; i++) {
      const val = Math.floor(Math.random() * 100);
      list.push(val);
      arr.push(val);
    }

    const idx = Math.floor(Math.random() * arr.length);
    const removedNode = list.removeAt(idx);
    const removedVal = arr.splice(idx, 1)[0];

    expect(removedNode.element).toBe(removedVal);
    expect(list.size()).toBe(arr.length);

    for (let i = 0; i < arr.length; i++) {
      expect(list.getElementAt(i).element).toBe(arr[i]);
    }

    expect(list.toString()).toBe('[' + arr.join(' ') + ']');
  });

  it('handles large number of elements', () => {
    const list = new LinkedList();
    const N = 10000;

    for (let i = 0; i < N; i++) {
      list.push(i);
    }

    expect(list.size()).toBe(N);
    expect(list.getElementAt(0).element).toBe(0);
    expect(list.getElementAt(N - 1).element).toBe(N - 1);
    const str = list.toString();
    expect(str.startsWith('[0 ')).toBe(true);
    expect(str.endsWith(`${N - 1}]`)).toBe(true);

    expect(list.removeAt(0).element).toBe(0);
    expect(list.removeAt(Math.floor(list.size() / 2))).toBeDefined();
    expect(list.removeAt(list.size() - 1)).toBeDefined();
  });
});
