import { describe, it, expect, beforeEach } from 'vitest';

import { Stack } from '../../ds/stackObject.js';

/** @type {Stack} */
let s;

function makePRNG(seed = 0x2a2a2a2a) {
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

describe('Stack<Object> — fundamentals', () => {
  beforeEach(() => {
    s = new Stack();
  });

  it('starts empty', () => {
    expect(s.isEmpty()).toBe(true);
    expect(s.size()).toBe(0);
    expect(s.peek()).toBeUndefined();
    expect(s.pop()).toBeUndefined();
    expect(s.toString()).toBe('');
  });

  it('push/pop obey LIFO', () => {
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.size()).toBe(3);
    expect(s.pop()).toBe(3);
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
    expect(s.pop()).toBeUndefined();
    expect(s.isEmpty()).toBe(true);
  });

  it('peek inspects top without removal', () => {
    s.push('a');
    s.push('b');
    expect(s.peek()).toBe('b');
    expect(s.size()).toBe(2);
    expect(s.pop()).toBe('b');
    expect(s.peek()).toBe('a');
    expect(s.size()).toBe(1);
  });

  it('clear empties and allows reuse', () => {
    s.push(10);
    s.push(20);
    s.push(30);
    s.clear();
    expect(s.isEmpty()).toBe(true);
    expect(s.size()).toBe(0);
    expect(s.peek()).toBeUndefined();
    expect(s.pop()).toBeUndefined();
    s.push(42);
    expect(s.size()).toBe(1);
    expect(s.peek()).toBe(42);
  });

  it('toString prints [a, b, c] (bottom→top), empty => ""', () => {
    expect(s.toString()).toBe('');
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.toString()).toBe('[1, 2, 3]');
    s.pop();
    expect(s.toString()).toBe('[1, 2]');
  });
});

describe('Stack<Object> — values & edge cases', () => {
  beforeEach(() => {
    s = new Stack();
  });

  it('distinguishes falsy values', () => {
    s.push(false);
    s.push(null);
    s.push(0);
    s.push('');
    s.push(NaN);
    expect(s.size()).toBe(5);
    expect(Number.isNaN(s.pop())).toBe(true);
    expect(s.pop()).toBe('');
    expect(s.pop()).toBe(0);
    expect(s.pop()).toBeNull();
    expect(s.pop()).toBe(false);
    expect(s.isEmpty()).toBe(true);
  });

  it('handles undefined as a stored value vs empty pops', () => {
    s.push(undefined);
    expect(s.size()).toBe(1);
    expect(s.peek()).toBeUndefined();
    expect(s.pop()).toBeUndefined();
    expect(s.isEmpty()).toBe(true);
    expect(s.pop()).toBeUndefined();
  });

  it('preserves object identity (no cloning)', () => {
    const obj = { a: 1 };
    s.push(obj);
    expect(s.peek()).toBe(obj);
    const out = s.pop();
    expect(out).toBe(obj);
    out.a = 2;
    expect(obj.a).toBe(2);
  });
});

describe('Stack<Object> — randomized vs Array reference', () => {
  it('matches Array push/pop semantics over many ops', () => {
    s = new Stack();
    const ref = [];
    const rand = makePRNG(0xc0ffee);

    const OPS = 1000;
    for (let i = 0; i < OPS; i++) {
      const r = rand();
      if (r < 0.6) {
        s.push(i);
        ref.push(i);
      } else {
        const a = s.pop();
        const b = ref.pop();
        expect(a).toBe(b);
      }
    }
    while (!s.isEmpty()) {
      expect(s.pop()).toBe(ref.pop());
    }
    expect(ref.length).toBe(0);
  });
});

describe('Stack<Object> — growth & stress (smoke)', () => {
  it('supports many pushes & pops while tracking size', () => {
    s = new Stack();
    const N = 20000;
    for (let i = 1; i <= N; i++) {
      s.push(i);
      if (i % 5000 === 0) {
        expect(s.size()).toBe(i);
        expect(s.peek()).toBe(i);
      }
    }
    for (let i = N; i >= 1; i--) {
      expect(s.pop()).toBe(i);
      if (i % 5000 === 0) {
        expect(s.size()).toBe(i - 1);
      }
    }
    expect(s.isEmpty()).toBe(true);
  });
});
