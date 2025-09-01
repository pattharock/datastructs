import { describe, it, expect, beforeEach } from 'vitest';
import { Queue } from '../../ds/queueLInkedList.js';

describe('Queue', () => {
  /** @type {Queue} */
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  it('starts empty', () => {
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('enqueue adds elements to the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.size()).toBe(3);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.peek()).toBe(1);
  });

  it('dequeue removes elements in FIFO order', () => {
    queue.enqueue('a');
    queue.enqueue('b');
    queue.enqueue('c');

    expect(queue.dequeue()).toBe('a');
    expect(queue.dequeue()).toBe('b');
    expect(queue.dequeue()).toBe('c');
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  it('peek shows the front element without removing it', () => {
    queue.enqueue(42);
    expect(queue.peek()).toBe(42);
    expect(queue.size()).toBe(1);

    queue.enqueue(99);
    expect(queue.peek()).toBe(42);
  });

  it('clear removes all elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.clear();

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('toString returns string representation', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const str = queue.toString();
    expect(typeof str).toBe('string');
    expect(str.includes('1')).toBe(true);
    expect(str.includes('2')).toBe(true);
    expect(str.includes('3')).toBe(true);
  });
});
