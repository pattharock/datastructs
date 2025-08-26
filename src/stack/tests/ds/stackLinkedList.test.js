import { describe, it, expect, beforeEach } from 'vitest';

import { Stack } from '../../ds/stackLInkedList.js';

/**@type {Stack} */
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

describe('Stack [Array Implementation] - fundamentals', () => {
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

  it('push and pop follow LIFO', () => {
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

  it('peek returns top without removing it', () => {
    s.push('a');
    s.push('b');
    expect(s.peek()).toBe('b');
    expect(s.size()).toBe(2);
    expect(s.pop()).toBe('b');
    expect(s.peek()).toBe('a');
    expect(s.size()).toBe(1);
  });

  it('size and isEmpty track correctly across operations', () => {
    expect(s.isEmpty()).toBe(true);
    s.push(10);
    expect(s.isEmpty()).toBe(false);
    expect(s.size()).toBe(1);
    s.push(20);
    expect(s.size()).toBe(2);
    s.pop();
    expect(s.size()).toBe(1);
    s.pop();
    expect(s.isEmpty()).toBe(true);
  });

  it('clear empties the stack and allows resure', () => {
    s.push(1);
    s.push(2);
    s.push(3);
    s.clear();
    expect(s.isEmpty()).toBe(true);
    expect(s.size()).toBe(0);
    expect(s.peek()).toBeUndefined();
    expect(s.pop()).toBeUndefined();
    s.push(42);
    expect(s.peek()).toBe(42);
    expect(s.size()).toBe(1);
  });

  it('handles undefined as a stored value', () => {
    s.push(undefined);
    expect(s.size()).toBe(1);
    expect(s.peek()).toBeUndefined();
    expect(s.pop()).toBeUndefined();
    expect(s.isEmpty()).toBe(true);
    expect(s.pop()).toBeUndefined();
  });

  it('toString prints top..bottom joined by a single space', () => {
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.toString()).toBe('3 2 1');
    expect(s.pop()).toEqual(3);
    expect(s.toString()).toBe('2 1');
  });
});

describe('Stack [Array Implementation] - randomized behavior vs reference array', () => {
  beforeEach(() => {
    s = new Stack();
  });

  it('matches Array <-> push/pop semantics over many operations', () => {
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

      while (!s.isEmpty()) {
        expect(s.pop()).toBe(ref.pop());
      }

      expect(ref.length).toBe(0);
    }
  });
});

describe('Stack [Array Implementation] - growth & stress (smoke)', () => {
  beforeEach(() => {
    s = new Stack();
  });

  it('supports many pushes and pops while tracking size', () => {
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
