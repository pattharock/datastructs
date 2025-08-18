import { describe, it, expect, beforeEach } from 'vitest';
import { Deque } from '../../ds/dequeObject.js';

/**@type {Deque} */
let dq;

describe('Deque (object-indexed)', () => {
  beforeEach(() => {
    dq = new Deque();
  });
  it('starts empty', () => {
    expect(dq.isEmpty()).toBe(true);
    expect(dq.size()).toBe(0);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();
  });

  it('pushBack/popBack behaves like a stack on the back', () => {
    dq.pushBack(1);
    dq.pushBack(2);
    dq.pushBack(3);
    expect(dq.size()).toBe(3);
    expect(dq.peekBack()).toBe(3);
    expect(dq.popBack()).toBe(3);
    expect(dq.popBack()).toBe(2);
    expect(dq.popBack()).toBe(1);
    expect(dq.popBack()).toBeUndefined();
    expect(dq.isEmpty()).toBe(true);
  });

  it('pushFront/popFront behaves like a stack on the front', () => {
    dq.pushFront(1);
    dq.pushFront(2);
    dq.pushFront(3);
    expect(dq.size()).toBe(3);
    expect(dq.peekFront()).toBe(3);
    expect(dq.popFront()).toBe(3);
    expect(dq.popFront()).toBe(2);
    expect(dq.popFront()).toBe(1);
    expect(dq.popFront()).toBeUndefined();
    expect(dq.isEmpty()).toBe(true);
  });

  it('mix of front/back operations preserves correct order', () => {
    dq.pushBack(1);
    dq.pushFront(0);
    dq.pushBack(2);
    dq.pushFront(-1);
    expect(dq.size()).toBe(4);
    expect(dq.peekFront()).toBe(-1);
    expect(dq.peekBack()).toBe(2);

    expect(dq.popFront()).toBe(-1);
    expect(dq.popBack()).toBe(2);
    expect(dq.popFront()).toBe(0);
    expect(dq.popBack()).toBe(1);
    expect(dq.isEmpty()).toBe(true);
  });

  it('clear() resets the deque and allows reuse', () => {
    dq.pushBack('a');
    dq.pushFront('b');
    dq.clear();
    expect(dq.size()).toBe(0);
    expect(dq.isEmpty()).toBe(true);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();

    dq.pushBack(42);
    expect(dq.size()).toBe(1);
    expect(dq.peekFront()).toBe(42);
    expect(dq.peekBack()).toBe(42);
  });

  it('pop on empty returns undefined and does not throw', () => {
    expect(dq.popFront()).toBeUndefined();
    expect(dq.popBack()).toBeUndefined();
    expect(dq.size()).toBe(0);
  });

  it('supports many pushFront operations (negative indices) and iterates in toString()', () => {
    for (let i = 1; i <= 5; i++) dq.pushFront(i);
    const s = dq.toString();
    expect(s).toBe('[ 5 4 3 2 1 ]');
    const out = [];
    while (!dq.isEmpty()) out.push(dq.popFront());
    expect(out).toEqual([5, 4, 3, 2, 1]);
  });

  it('peeks do not mutate size', () => {
    dq.pushBack('x');
    dq.pushFront('y');
    const before = dq.size();
    expect(dq.peekFront()).toBe('y');
    expect(dq.peekBack()).toBe('x');
    expect(dq.size()).toBe(before);
  });

  it('size tracks across mixed operations', () => {
    expect(dq.size()).toBe(0);
    dq.pushBack(1);
    dq.pushFront(2);
    dq.pushBack(3);
    expect(dq.size()).toBe(3);

    dq.popFront();
    expect(dq.size()).toBe(2);
    dq.popBack();
    expect(dq.size()).toBe(1);
    dq.popBack();
    expect(dq.size()).toBe(0);
  });

  it('toString() on empty', () => {
    expect(dq.toString()).toBe('[ ]');
  });
});
