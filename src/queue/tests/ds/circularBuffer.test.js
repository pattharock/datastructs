import { describe, it, expect, beforeEach } from 'vitest';
import { CircularBuffer } from '../../ds/CircularBuffer.js';

/**@type {CircularBuffer} */
let cb;

describe('CircularBuffer — basics', () => {
  beforeEach(() => {
    cb = new CircularBuffer(3, 'CB');
  });

  it('starts empty', () => {
    expect(cb.isEmpty()).toBe(true);
    expect(cb.size()).toBe(0);
    expect(cb.front()).toBeUndefined();
    expect(cb.dequeue()).toBeUndefined();
    expect(cb.toString()).toBe('[ ]');
  });

  it('enqueue/dequeue obey FIFO', () => {
    cb.enqueue(1);
    cb.enqueue(2);
    cb.enqueue(3);
    expect(cb.size()).toBe(3);
    expect(cb.front()).toBe(1);
    expect(cb.dequeue()).toBe(1);
    expect(cb.dequeue()).toBe(2);
    expect(cb.dequeue()).toBe(3);
    expect(cb.dequeue()).toBeUndefined();
    expect(cb.isEmpty()).toBe(true);
  });

  it('clear empties and allows reuse', () => {
    cb.enqueue(10);
    cb.enqueue(20);
    cb.clear();
    expect(cb.isEmpty()).toBe(true);
    expect(cb.size()).toBe(0);
    expect(cb.front()).toBeUndefined();
    cb.enqueue(42);
    expect(cb.toString()).toBe('[ 42 ]');
  });
});

describe('CircularBuffer — values & identity', () => {
  beforeEach(() => {
    cb = new CircularBuffer();
  });

  it('handles falsy values distinctly', () => {
    cb.enqueue(false);
    cb.enqueue(null);
    cb.enqueue(0);
    cb.enqueue('');
    cb.enqueue(NaN);
    expect(cb.size()).toBe(5);
    expect(cb.dequeue()).toBe(false);
    expect(cb.dequeue()).toBeNull();
    expect(cb.dequeue()).toBe(0);
    expect(cb.dequeue()).toBe('');
    expect(Number.isNaN(cb.dequeue())).toBe(true);
    expect(cb.isEmpty()).toBe(true);
  });

  it('supports undefined explicitly enqueued', () => {
    cb.enqueue(undefined);
    expect(cb.front()).toBeUndefined();
    expect(cb.dequeue()).toBeUndefined();
    expect(cb.isEmpty()).toBe(true);
  });

  it('preserves object identity', () => {
    const obj = { x: 1 };
    cb.enqueue(obj);
    expect(cb.front()).toBe(obj);
    const out = cb.dequeue();
    expect(out).toBe(obj);
  });
});

describe('CircularBuffer — wrap-around & growth', () => {
  it('wraps around and maintains FIFO order', () => {
    cb = new CircularBuffer(3);
    cb.enqueue('A');
    cb.enqueue('B');
    cb.enqueue('C');
    expect(cb.dequeue()).toBe('A');
    cb.enqueue('D');
    expect(cb.toString()).toBe('[ B C D ]');
    expect(cb.dequeue()).toBe('B');
    expect(cb.dequeue()).toBe('C');
    expect(cb.dequeue()).toBe('D');
    expect(cb.isEmpty()).toBe(true);
  });

  it('handles more enqueues than initial capacity (grows internally)', () => {
    cb = new CircularBuffer(2);
    for (let i = 1; i <= 20; i++) cb.enqueue(i);
    expect(cb.size()).toBe(20);
    expect(cb.front()).toBe(1);
    for (let i = 1; i <= 20; i++) {
      expect(cb.dequeue()).toBe(i);
    }
    expect(cb.isEmpty()).toBe(true);
  });
});

describe('CircularBuffer — shrink behavior', () => {
  it('remains functional after many enqueues/dequeues', () => {
    cb = new CircularBuffer(2);
    for (let i = 0; i < 1000; i++) {
      cb.enqueue(i);
      expect(cb.dequeue()).toBe(i);
    }
    expect(cb.isEmpty()).toBe(true);
    cb.enqueue('X');
    cb.enqueue('Y');
    expect(cb.toString()).toBe('[ X Y ]');
  });
});
