import { describe, it, expect } from 'vitest';
import { DoubleNode } from '../../ds/doublyLinkedListNode.js';

describe('DoubleNode', () => {
  it('stores element and initializes next/prev as null if not provided', () => {
    const node = new DoubleNode(10);
    expect(node.element).toBe(10);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('accepts next and prev references at construction', () => {
    const first = new DoubleNode(1);
    const second = new DoubleNode(2, null, first);
    first.next = second;

    expect(second.prev).toBe(first);
    expect(first.next).toBe(second);
  });

  it('toString returns string representation of element', () => {
    const node = new DoubleNode(42);
    expect(node.toString()).toBe('42');

    const strNode = new DoubleNode('hello');
    expect(strNode.toString()).toBe('hello');

    const objNode = new DoubleNode({ a: 1 });
    expect(objNode.toString()).toBe('[object Object]');
  });

  it('handles null and undefined elements gracefully in toString', () => {
    const nullNode = new DoubleNode(null);
    const undefNode = new DoubleNode(undefined);

    expect(nullNode.toString()).toBe('null');
    expect(undefNode.toString()).toBe('undefined');
  });

  it('can be linked forward and backward manually', () => {
    const first = new DoubleNode(1);
    const second = new DoubleNode(2);
    const third = new DoubleNode(3);

    first.next = second;
    second.next = third;

    second.prev = first;
    third.prev = second;

    expect(first.next.element).toBe(2);
    expect(second.prev.element).toBe(1);
    expect(second.next.element).toBe(3);
    expect(third.prev.element).toBe(2);
  });
});
