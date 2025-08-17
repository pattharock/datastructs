import { describe, it, expect, beforeEach } from 'vitest';

import { Queue } from '../../ds/headPointerQueueArray.js';
let q;

describe('Queue(head-pointer) — basics', () => {
  beforeEach(() => {
    q = new Queue('Q');
  });

  it('starts empty', () => {
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
    expect(q.peek()).toBeUndefined();
    expect(q.dequeue()).toBeUndefined();
    expect(q.toString()).toBe('[ ]');
    expect(q.label).toBe('Q');
  });

  it('enqueue/dequeue obey FIFO', () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.size()).toBe(3);
    expect(q.peek()).toBe(1);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.dequeue()).toBeUndefined();
    expect(q.isEmpty()).toBe(true);
  });

  it('size/peek track correctly across operations', () => {
    q.enqueue('a');
    expect(q.size()).toBe(1);
    expect(q.peek()).toBe('a');
    q.enqueue('b');
    expect(q.size()).toBe(2);
    expect(q.peek()).toBe('a');
    q.dequeue();
    expect(q.size()).toBe(1);
    expect(q.peek()).toBe('b');
  });

  it('clear empties and allows reuse', () => {
    q.enqueue(10);
    q.enqueue(20);
    q.clear();
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
    expect(q.peek()).toBeUndefined();
    expect(q.dequeue()).toBeUndefined();
    q.enqueue(42);
    expect(q.size()).toBe(1);
    expect(q.peek()).toBe(42);
  });
});

describe('Queue(head-pointer) — values & edge cases', () => {
  beforeEach(() => {
    q = new Queue();
  });

  it('handles falsy values distinctly', () => {
    q.enqueue(false);
    q.enqueue(null);
    q.enqueue(0);
    q.enqueue('');
    q.enqueue(NaN);
    expect(q.size()).toBe(5);
    expect(q.dequeue()).toBe(false);
    expect(q.dequeue()).toBeNull();
    expect(q.dequeue()).toBe(0);
    expect(q.dequeue()).toBe('');
    expect(Number.isNaN(q.dequeue())).toBe(true);
    expect(q.isEmpty()).toBe(true);
  });

  it('supports undefined as an enqueued value', () => {
    q.enqueue(undefined);
    expect(q.size()).toBe(1);
    expect(q.peek()).toBeUndefined();
    expect(q.dequeue()).toBeUndefined();
    expect(q.isEmpty()).toBe(true);
  });

  it('preserves object identity', () => {
    const obj = { x: 1 };
    q.enqueue(obj);
    expect(q.peek()).toBe(obj);
    const out = q.dequeue();
    expect(out).toBe(obj);
    out.x = 2;
    expect(obj.x).toBe(2);
  });
});

describe('Queue(head-pointer) — toString formatting', () => {
  beforeEach(() => {
    q = new Queue();
  });

  it('prints with brackets and single spaces between items', () => {
    expect(q.toString()).toBe('[ ]');
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.toString()).toBe('[ 1 2 3 ]');
    q.dequeue();
    expect(q.toString()).toBe('[ 2 3 ]');
  });

  it('uses each item’s own toString', () => {
    const o = { toString: () => 'OBJ' };
    q.enqueue(7);
    q.enqueue(o);
    q.enqueue('x');
    expect(q.toString()).toBe('[ 7 OBJ x ]');
  });
});

describe('Queue(head-pointer) — compaction path', () => {
  it('continues to behave correctly after compaction threshold is crossed', () => {
    q = new Queue();
    const N = 200;
    for (let i = 0; i < N; i++) q.enqueue(i);
    for (let i = 0; i < 150; i++) {
      expect(q.dequeue()).toBe(i);
    }
    expect(q.size()).toBe(50);
    expect(q.peek()).toBe(150);
    expect(q.toString().startsWith('[ 150')).toBe(true);

    for (let i = 150; i < 175; i++) {
      expect(q.dequeue()).toBe(i);
    }
    expect(q.peek()).toBe(175);
    expect(q.size()).toBe(25);

    for (let i = 1000; i < 1010; i++) q.enqueue(i);
    for (let i = 175; i <= 199; i++) expect(q.dequeue()).toBe(i);
    for (let i = 1000; i < 1010; i++) expect(q.dequeue()).toBe(i);
    expect(q.isEmpty()).toBe(true);
  });
});

describe('Queue(head-pointer) — randomized vs Array reference', () => {
  function prng(seed = 0xc0ffee) {
    let x = seed >>> 0;
    return () => {
      x ^= x << 13;
      x >>>= 0;
      x ^= x >>> 17;
      x >>>= 0;
      x ^= x << 5;
      x >>>= 0;
      return x / 2 ** 32;
    };
  }

  it('matches Array push/shift behavior over many ops (and triggers compaction along the way)', () => {
    q = new Queue();
    const ref = [];
    const rand = prng(0xdeadbeef);
    const OPS = 3000;

    for (let i = 0; i < OPS; i++) {
      const r = rand();
      if (r < 0.66) {
        q.enqueue(i);
        ref.push(i);
      } else {
        const a = q.dequeue();
        const b = ref.shift();
        expect(a).toBe(b);
      }
      if (i % 500 === 0) {
        expect(q.size()).toBe(ref.length);
        if (ref.length > 0) expect(q.peek()).toBe(ref[0]);
      }
    }
    const drained = [];
    while (!q.isEmpty()) drained.push(q.dequeue());
    const drainedRef = [];
    while (ref.length) drainedRef.push(ref.shift());
    expect(drained).toEqual(drainedRef);
  });
});
