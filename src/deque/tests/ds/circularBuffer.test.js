import { describe, it, expect, beforeEach } from 'vitest';

import { CircularBuffer } from '../../ds/circularBuffer.js';

/**@type {CircularBuffer} */
let dq;

describe('CircularBuffer (deque via circular array)', () => {
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  beforeEach(() => {
    dq = new CircularBuffer();
  });

  it('new buffer is empty with size 0', () => {
    expect(dq.isEmpty()).toBe(true);
    expect(dq.size()).toBe(0);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();
    expect(dq.popFront()).toBeUndefined();
    expect(dq.popBack()).toBeUndefined();
    expect(dq.toString()).toBe('[ ]');
  });

  it('pushBack then popFront behaves like FIFO queue', () => {
    dq.pushBack(1);
    dq.pushBack(2);
    dq.pushBack(3);
    expect(dq.size()).toBe(3);
    expect(dq.peekFront()).toBe(1);
    expect(dq.peekBack()).toBe(3);
    expect(dq.popFront()).toBe(1);
    expect(dq.popFront()).toBe(2);
    expect(dq.popFront()).toBe(3);
    expect(dq.popFront()).toBeUndefined();
    expect(dq.isEmpty()).toBe(true);
  });

  it('pushFront then popBack behaves like stack from front (LIFO)', () => {
    dq.pushFront(1);
    dq.pushFront(2);
    dq.pushFront(3);
    expect(dq.size()).toBe(3);
    expect(dq.peekFront()).toBe(3);
    expect(dq.peekBack()).toBe(1);
    expect(dq.popBack()).toBe(1);
    expect(dq.popBack()).toBe(2);
    expect(dq.popBack()).toBe(3);
    expect(dq.popBack()).toBeUndefined();
  });

  it('mixed operations keep correct order', () => {
    dq.pushBack(10);
    dq.pushFront(5);
    dq.pushBack(20);
    expect(dq.toString()).toBe('[ 5 10 20 ]');
    expect(dq.popFront()).toBe(5);
    dq.pushFront(1);
    dq.pushBack(30);
    expect(dq.popBack()).toBe(30);
    expect(dq.toString()).toBe('[ 1 10 20 ]');
  });

  it('wrap-around works for head and tail at boundaries', () => {
    for (let i = 0; i < 8; i++) dq.pushBack(i);
    expect(dq.size()).toBe(8);
    expect(dq.popFront()).toBe(0);
    expect(dq.popFront()).toBe(1);
    expect(dq.size()).toBe(6);
    dq.pushBack(8);
    dq.pushBack(9);
    expect(dq.size()).toBe(8);
    const out = [];
    while (!dq.isEmpty()) out.push(dq.popFront());
    expect(out).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('grow: pushing beyond capacity doubles and preserves order', () => {
    const N = 25;
    for (let i = 0; i < N; i++) {
      if (i % 2 === 0) dq.pushBack(i);
      else dq.pushFront(i);
    }
    expect(dq.size()).toBe(N);

    const acc = [];
    while (!dq.isEmpty()) acc.push(dq.popFront());
    expect(acc).toEqual([
      23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24,
    ]);
  });

  it('peekFront/peekBack do not modify the buffer', () => {
    dq.pushBack('a');
    dq.pushBack('b');
    dq.pushFront('z');
    expect(dq.peekFront()).toBe('z');
    expect(dq.peekBack()).toBe('b');
    expect(dq.size()).toBe(3);
    expect(dq.toString()).toBe('[ z a b ]');
  });

  it('pop on empty returns undefined', () => {
    expect(dq.popFront()).toBeUndefined();
    expect(dq.popBack()).toBeUndefined();
  });

  it('clear resets to empty and minimum capacity', () => {
    for (let i = 0; i < 40; i++) dq.pushBack(i);
    expect(dq.size()).toBe(40);
    dq.clear();
    expect(dq.size()).toBe(0);
    expect(dq.isEmpty()).toBe(true);
    expect(dq.toString()).toBe('[ ]');
    dq.pushBack(1);
    dq.pushFront(0);
    expect(dq.toString()).toBe('[ 0 1 ]');
  });

  it('shrink: dropping below 1/4 capacity triggers resize and preserves order', () => {
    for (let i = 0; i < 32; i++) dq.pushBack(i);
    for (let i = 0; i < 25; i++) dq.popFront();
    expect(dq.size()).toBe(7);
    const rest = [];
    while (!dq.isEmpty()) rest.push(dq.popFront());
    expect(rest).toEqual([25, 26, 27, 28, 29, 30, 31]);
  });

  it('toString uses "[ a b c ]" format', () => {
    dq.pushBack('a');
    dq.pushBack('b');
    dq.pushFront('z');
    expect(dq.toString()).toBe('[ z a b ]');
  });

  it('stress: randomized mixed ops maintain same behavior as model array', () => {
    const model = [];
    const rand = mulberry32(42);
    const ops = 5000;
    for (let i = 0; i < ops; i++) {
      const r = rand();
      if (r < 0.25) {
        dq.pushFront(i);
        model.unshift(i);
      } else if (r < 0.5) {
        dq.pushBack(i);
        model.push(i);
      } else if (r < 0.75) {
        const got = dq.popFront();
        const exp = model.shift();
        expect(got).toBe(exp);
      } else {
        const got = dq.popBack();
        const exp = model.pop();
        expect(got).toBe(exp);
      }
    }

    const fromDq = [];
    while (!dq.isEmpty()) fromDq.push(dq.popFront());
    expect(fromDq).toEqual(model);
  });
});
