import { describe, it, expect, beforeEach } from 'vitest';

import { Deque } from '../../ds/dequeArray.js';

/**@type {Deque} */
let dq;

describe('Deque — basics', () => {
  beforeEach(() => {
    dq = new Deque('D');
  });

  it('starts empty', () => {
    expect(dq.isEmpty()).toBe(true);
    expect(dq.size()).toBe(0);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();
    expect(dq.popFront()).toBeUndefined();
    expect(dq.popBack()).toBeUndefined();
    expect(dq.toString()).toBe('[ ]');
    expect(dq.label).toBe('D');
  });

  it('pushBack/popBack act like a stack at the back', () => {
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

  it('pushFront/popFront act like a stack at the front', () => {
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

  it('can mix front/back operations correctly', () => {
    dq.pushBack('b1');
    dq.pushFront('f1');
    dq.pushBack('b2');
    dq.pushFront('f2');
    expect(dq.peekFront()).toBe('f2');
    expect(dq.peekBack()).toBe('b2');
    expect(dq.popFront()).toBe('f2');
    expect(dq.popBack()).toBe('b2');
    expect(dq.popFront()).toBe('f1');
    expect(dq.popBack()).toBe('b1');
    expect(dq.isEmpty()).toBe(true);
  });

  it('clear empties and allows reuse', () => {
    dq.pushBack(10);
    dq.pushFront(20);
    dq.clear();
    expect(dq.isEmpty()).toBe(true);
    expect(dq.size()).toBe(0);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();
    dq.pushBack(42);
    expect(dq.size()).toBe(1);
    expect(dq.peekFront()).toBe(42);
    expect(dq.peekBack()).toBe(42);
  });
});

describe('Deque — toString formatting', () => {
  beforeEach(() => {
    dq = new Deque();
  });

  it('prints with brackets and single spaces', () => {
    expect(dq.toString()).toBe('[ ]');
    dq.pushBack(1);
    dq.pushBack(2);
    dq.pushBack(3);
    expect(dq.toString()).toBe('[ 1 2 3 ]');
    dq.pushFront(0);
    expect(dq.toString()).toBe('[ 0 1 2 3 ]');
    dq.popBack();
    expect(dq.toString()).toBe('[ 0 1 2 ]');
  });

  it('uses each element’s toString', () => {
    const obj = { toString: () => 'OBJ' };
    dq.pushBack(7);
    dq.pushBack(obj);
    dq.pushBack('x');
    expect(dq.toString()).toBe('[ 7 OBJ x ]');
  });
});

describe('Deque — values & edge cases', () => {
  beforeEach(() => {
    dq = new Deque();
  });

  it('handles falsy values distinctly', () => {
    dq.pushBack(false);
    dq.pushBack(null);
    dq.pushBack(0);
    dq.pushBack('');
    dq.pushBack(NaN);
    expect(dq.size()).toBe(5);
    expect(dq.popFront()).toBe(false);
    expect(dq.popFront()).toBeNull();
    expect(dq.popFront()).toBe(0);
    expect(dq.popFront()).toBe('');
    expect(Number.isNaN(dq.popFront())).toBe(true);
    expect(dq.isEmpty()).toBe(true);
  });

  it('supports undefined explicitly', () => {
    dq.pushFront(undefined);
    expect(dq.size()).toBe(1);
    expect(dq.peekFront()).toBeUndefined();
    expect(dq.peekBack()).toBeUndefined();
    expect(dq.popBack()).toBeUndefined();
    expect(dq.isEmpty()).toBe(true);
  });

  it('preserves object identity', () => {
    const o = { a: 1 };
    dq.pushBack(o);
    expect(dq.peekFront()).toBe(o);
    expect(dq.peekBack()).toBe(o);
    const out = dq.popFront();
    expect(out).toBe(o);
    out.a = 2;
    expect(o.a).toBe(2);
  });
});

describe('Deque — randomized cross-check vs Array', () => {
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

  it('matches Array semantics for mixed front/back ops', () => {
    dq = new Deque();
    const ref = [];
    const rand = prng(0xdeadbeef);
    const OPS = 1500;

    for (let i = 0; i < OPS; i++) {
      const r = rand();
      if (r < 0.25) {
        const v = i;
        dq.pushFront(v);
        ref.unshift(v);
      } else if (r < 0.5) {
        const v = i;
        dq.pushBack(v);
        ref.push(v);
      } else if (r < 0.75) {
        const a = dq.popFront();
        const b = ref.shift();
        expect(a).toBe(b);
      } else {
        const a = dq.popBack();
        const b = ref.pop();
        expect(a).toBe(b);
      }

      expect(dq.size()).toBe(ref.length);
      const pf = dq.peekFront();
      const pb = dq.peekBack();
      const rf = ref.length ? ref[0] : undefined;
      const rb = ref.length ? ref[ref.length - 1] : undefined;
      expect(pf).toBe(rf);
      expect(pb).toBe(rb);
    }

    while (!dq.isEmpty()) {
      expect(dq.popFront()).toBe(ref.shift());
    }
    expect(ref.length).toBe(0);
  });
});

describe('Deque — light stress', () => {
  it('handles many pushes/pops while tracking size', () => {
    dq = new Deque();
    const N = 20_000;

    for (let i = 0; i < N; i++) {
      if (i % 2 === 0) dq.pushBack(i);
      else dq.pushFront(i);
    }
    expect(dq.size()).toBe(N);

    let count = 0;
    while (!dq.isEmpty()) {
      if (count % 2 === 0) dq.popFront();
      else dq.popBack();
      count++;
    }
    expect(dq.size()).toBe(0);
    expect(dq.isEmpty()).toBe(true);
  });
});
