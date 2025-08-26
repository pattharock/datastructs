import { describe, it, expect, beforeEach } from 'vitest';
import { SortedLinkedList } from '../../ds/sortedLInkedList.js';

const eq = (a, b) => a === b;
const asc = (a, b) => (a === b ? 0 : a < b ? -1 : 1);
const desc = (a, b) => (a === b ? 0 : a > b ? -1 : 1);

describe('SortedLinkedList', () => {
  let list;

  beforeEach(() => {
    list = new SortedLinkedList(eq, asc);
  });

  it('inserts into an empty list at index 0', () => {
    const ok = list.insert(10);
    expect(ok).toBe(true);
    expect(list.size()).toBe(1);
    expect(list.getElementAt(0).element).toBe(10);
  });

  it('maintains ascending order when inserting unsorted data', () => {
    [5, 1, 3, 4, 2].forEach((x) => list.insert(x));
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([1, 2, 3, 4, 5]);
  });

  it('inserts at head when element is smallest', () => {
    [3, 4, 5].forEach((x) => list.insert(x));
    list.insert(1);
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([1, 3, 4, 5]);
  });

  it('inserts at tail when element is largest', () => {
    [3, 4, 5].forEach((x) => list.insert(x));
    list.insert(10);
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([3, 4, 5, 10]);
  });

  it('places duplicates after existing equals (stable among equals with current logic)', () => {
    [2, 2, 2].forEach((x) => list.insert(x));
    list.insert(2);
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([2, 2, 2, 2]);
    expect(list.indexOf(2)).toBe(0);
  });

  it('getInsertionIndex returns correct indices for various cases', () => {
    [2, 4, 6, 8].forEach((x) => list.insert(x));
    expect(list.getInsertionIndex(1)).toBe(0);
    expect(list.getInsertionIndex(5)).toBe(2);
    expect(list.getInsertionIndex(6)).toBe(3);
    expect(list.getInsertionIndex(10)).toBe(4 + 0);
  });

  it('remove deletes a middle element and keeps list sorted', () => {
    [1, 2, 3, 4, 5].forEach((x) => list.insert(x));
    const removed = list.remove(3);
    expect(removed?.element).toBe(3);
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([1, 2, 4, 5]);
  });

  it('remove returns undefined for non-existent element', () => {
    [1, 2, 3].forEach((x) => list.insert(x));
    const removed = list.remove(42);
    expect(removed).toBeUndefined();
    expect(list.size()).toBe(3);
  });

  it('removeAt deletes by index and keeps structure valid', () => {
    [1, 2, 3, 4].forEach((x) => list.insert(x));
    const del0 = list.removeAt(0);
    expect(del0?.element).toBe(1);
    const delEnd = list.removeAt(list.size() - 1);
    expect(delEnd?.element).toBe(4);
    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    expect(values).toEqual([2, 3]);
  });

  it('indexOf finds the first occurrence', () => {
    [1, 2, 2, 2, 3].forEach((x) => list.insert(x));
    expect(list.indexOf(2)).toBe(1);
    expect(list.indexOf(42)).toBe(-1);
  });

  it('getElementAt returns undefined for out-of-bounds', () => {
    [10, 20, 30].forEach((x) => list.insert(x));
    expect(list.getElementAt(-1)).toBeUndefined();
    expect(list.getElementAt(3)).toBeUndefined();
  });

  it('size and isEmpty reflect list state correctly', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
    [3, 1, 2].forEach((x) => list.insert(x));
    expect(list.isEmpty()).toBe(false);
    expect(list.size()).toBe(3);
  });

  it('works with a custom DESCENDING comparator', () => {
    const descList = new SortedLinkedList(eq, desc);
    [2, 1, 3, 4, 0].forEach((x) => descList.insert(x));
    const values = [];
    for (let i = 0; i < descList.size(); i++) values.push(descList.getElementAt(i).element);
    expect(values).toEqual([4, 3, 2, 1, 0]);
  });

  it('does not rely on size() inside traversal (sanity structural test)', () => {
    const many = Array.from({ length: 200 }, () => Math.floor(Math.random() * 1000));
    many.forEach((x) => list.insert(x));

    const values = [];
    for (let i = 0; i < list.size(); i++) values.push(list.getElementAt(i).element);
    const sorted = [...values].sort((a, b) => a - b);
    expect(values).toEqual(sorted);
  });
});
