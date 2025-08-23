import { describe, it, expect, beforeEach } from 'vitest';

import { DoublyLinkedList } from '../../ds/doublyLinkedList.js';

const expectIntegrity = (dll) => {
  let forward = 0;
  let cur = dll.getHead();
  let prev = null;

  while (cur) {
    expect(cur.prev ?? null).toBe(prev ?? null);
    forward++;
    prev = cur;
    cur = cur.next ?? null;
  }
  expect(forward).toBe(dll.size());
  if (dll.size() === 0) {
    expect(dll.getHead()).toBeFalsy();
    expect(dll.getTail()).toBeFalsy();
  } else {
    expect(dll.getTail()).toBe(prev);
  }

  let backward = 0;
  let curBack = dll.getTail();
  let next = null;

  while (curBack) {
    expect(curBack.next ?? null).toBe(next ?? null);
    backward++;
    next = curBack;
    curBack = curBack.prev ?? null;
  }
  expect(backward).toBe(dll.size());
  if (dll.size() > 0) {
    expect(next).toBe(dll.getHead());
  }
};

describe('DoublyLinkedList', () => {
  let list;

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  it('starts empty with null head/tail', () => {
    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeFalsy();
    expect(list.getTail()).toBeFalsy();
    expect(list.isEmpty()).toBe(true);
    expect(list.toString()).toBe('');
    expectIntegrity(list);
  });

  it('push appends to tail and links prev/next', () => {
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.size()).toBe(3);
    expect(list.getHead()?.element).toBe(1);
    expect(list.getTail()?.element).toBe(3);
    expect(list.toString()).toBe('1 2 3');
    expectIntegrity(list);
  });

  it('insert at head, middle, tail', () => {
    expect(list.insert(2, 0)).toBe(true);
    expect(list.insert(4, 1)).toBe(true);
    expect(list.insert(3, 1)).toBe(true);
    expect(list.insert(1, 0)).toBe(true);
    expect(list.insert(5, 4)).toBe(true);
    expect(list.toString()).toBe('1 2 3 4 5');
    expectIntegrity(list);
  });

  it('insert rejects out-of-bounds', () => {
    expect(list.insert(1, -1)).toBe(false);
    expect(list.insert(1, 1)).toBe(false);
    list.push(10);
    expect(list.insert(20, 2)).toBe(false);
  });

  it('removeAt handles head, middle, tail, and single-node', () => {
    [1, 2, 3, 4].forEach((v) => list.push(v));
    const rHead = list.removeAt(0);
    expect(rHead?.element).toBe(1);
    expect(list.toString()).toBe('2 3 4');

    const rMid = list.removeAt(1);
    expect(rMid?.element).toBe(3);
    expect(list.toString()).toBe('2 4');

    const rTail = list.removeAt(1);
    expect(rTail?.element).toBe(4);
    expect(list.toString()).toBe('2');

    const rOnly = list.removeAt(0);
    expect(rOnly?.element).toBe(2);
    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expectIntegrity(list);
  });

  it('removeAt(index) rejects out of bounds', () => {
    expect(list.removeAt(-1)).toBeUndefined();
    list.push(20);
    expect(list.removeAt(-1)).toBeUndefined();
  });

  it('remove(element) handles empty list', () => {
    expect(list.remove(100)).toBeUndefined();
    list.push(20);
    expect(list.removeAt(-1)).toBeUndefined();
  });

  it('remove(element) removes first match (head/middle/tail) and returns node', () => {
    [1, 2, 2, 3].forEach((v) => list.push(v));

    const rHead = list.remove(1);
    expect(rHead?.element).toBe(1);
    expect(list.toString()).toBe('2 2 3');

    const rMid = list.remove(2);
    expect(rMid?.element).toBe(2);
    expect(list.toString()).toBe('2 3');

    const rTail = list.remove(3);
    expect(rTail?.element).toBe(3);
    expect(list.toString()).toBe('2');

    const rOnly = list.remove(2);
    expect(rOnly?.element).toBe(2);
    expect(list.size()).toBe(0);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expectIntegrity(list);
  });

  it('remove(element) returns undefined if not found and leaves list unchanged', () => {
    [10, 20, 30].forEach((v) => list.push(v));
    const before = list.toString();
    const removed = list.remove(99);
    expect(removed).toBeUndefined();
    expect(list.toString()).toBe(before);
    expectIntegrity(list);
  });

  it('getElementAt returns correct nodes and undefined when invalid', () => {
    expect(list.getElementAt(0)).toBeUndefined();
    [1, 2, 3, 4, 5].forEach((v) => list.push(v));
    expect(list.getElementAt(-1)).toBeUndefined();
    expect(list.getElementAt(5)).toBeUndefined();
    expect(list.getElementAt(0)?.element).toBe(1);
    expect(list.getElementAt(2)?.element).toBe(3);
    expect(list.getElementAt(4)?.element).toBe(5);
  });

  it('supports custom equalsFn in remove(element)', () => {
    const eq = (a, b) => a?.id === b?.id;
    const olist = new DoublyLinkedList(eq);
    olist.push({ id: 1 });
    olist.push({ id: 2 });
    olist.push({ id: 3 });

    const removed = olist.remove({ id: 2 });
    expect(removed?.element.id).toBe(2);
    expect(olist.size()).toBe(2);
    expect(olist.getElementAt(0)?.element.id).toBe(1);
    expect(olist.getElementAt(1)?.element.id).toBe(3);
    expectIntegrity(olist);
  });
});
