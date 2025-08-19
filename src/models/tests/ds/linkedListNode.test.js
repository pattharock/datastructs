import { describe, it, expect } from 'vitest';
import { Node } from '../../ds/linkedListNode.js';

describe('Node', () => {
  it('stores element and initializes next as null', () => {
    const node = new Node(10);
    expect(node.element).toBe(10);
    expect(node.next).toBeNull();
  });

  it('toString should return string representation of a number', () => {
    const node = new Node(42);
    expect(node.toString()).toBe('42');
  });

  it('toString should return string representation of a string', () => {
    const node = new Node('hello');
    expect(node.toString()).toBe('hello');
  });

  it('toString should handle objects gracefully', () => {
    const obj = { a: 1 };
    const node = new Node(obj);
    expect(node.toString()).toBe('[object Object]');
  });

  it('toString should handle null and undefined', () => {
    const nullNode = new Node(null);
    const undefinedNode = new Node(undefined);

    expect(nullNode.toString()).toBe('null');
    expect(undefinedNode.toString()).toBe('undefined');
  });

  it('can be manually linked to another Node', () => {
    const first = new Node(1);
    const second = new Node(2);
    first.next = second;

    expect(first.next.element).toBe(2);
    expect(first.next.next).toBeNull();
  });
});
