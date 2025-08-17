import { describe, it, expect } from 'vitest';
import { parenthesesChecker } from '../../problems/parenthesesChecker.js';

describe('parenthesesChecker — basics', () => {
  it('accepts empty string', () => {
    expect(parenthesesChecker('')).toBe(true);
  });

  it('ignores non-bracket characters', () => {
    expect(parenthesesChecker('abc123')).toBe(true);
    expect(parenthesesChecker('(a[b]{c})')).toBe(true);
    expect(parenthesesChecker('(a[b]{c}')).toBe(false);
  });

  it('single unmatched openers are invalid', () => {
    expect(parenthesesChecker('(')).toBe(false);
    expect(parenthesesChecker('[')).toBe(false);
    expect(parenthesesChecker('{')).toBe(false);
  });

  it('single unmatched closers are invalid', () => {
    expect(parenthesesChecker(')')).toBe(false);
    expect(parenthesesChecker(']')).toBe(false);
    expect(parenthesesChecker('}')).toBe(false);
  });
});

describe('parenthesesChecker — matching & nesting', () => {
  it('simple pairs', () => {
    expect(parenthesesChecker('()')).toBe(true);
    expect(parenthesesChecker('[]')).toBe(true);
    expect(parenthesesChecker('{}')).toBe(true);
  });

  it('properly nested mix', () => {
    expect(parenthesesChecker('([])')).toBe(true);
    expect(parenthesesChecker('{[()]}')).toBe(true);
    expect(parenthesesChecker('({[]})')).toBe(true);
  });

  it('interleaving in wrong order is invalid', () => {
    expect(parenthesesChecker('(]')).toBe(false);
    expect(parenthesesChecker('([)]')).toBe(false);
    expect(parenthesesChecker('{[}]')).toBe(false);
  });

  it('extra closer is invalid', () => {
    expect(parenthesesChecker('())')).toBe(false);
    expect(parenthesesChecker('[]]')).toBe(false);
    expect(parenthesesChecker('{}]')).toBe(false);
  });

  it('extra opener remaining on stack is invalid', () => {
    expect(parenthesesChecker('(()')).toBe(false);
    expect(parenthesesChecker('[[[]')).toBe(false);
    expect(parenthesesChecker('{{}')).toBe(false);
  });
});

describe('parenthesesChecker — longer strings', () => {
  it('long valid sequence', () => {
    const s = '(((((((((())))))))))' + '[[]{}([]{})]' + '{[()()()()]}';
    expect(parenthesesChecker(s)).toBe(true);
  });

  it('long invalid sequence (one mismatch)', () => {
    const s = '(((((((())))))))' + '[[]{}([]{)]' + '{[()()()()]}';
    expect(parenthesesChecker(s)).toBe(false);
  });
});
