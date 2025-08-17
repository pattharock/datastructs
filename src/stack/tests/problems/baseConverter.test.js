import { describe, it, expect } from 'vitest';

import { baseConverter } from '../../problems/baseConverter';

describe('baseConverter (stack-based)', () => {
  it('converts small numbers to binary', () => {
    expect(baseConverter(5, 2)).toBe('101');
    expect(baseConverter(13, 2)).toBe('1101');
    expect(baseConverter(255, 2)).toBe('11111111');
  });

  it('converts to octal', () => {
    expect(baseConverter(8, 8)).toBe('10');
    expect(baseConverter(73, 8)).toBe('111');
    expect(baseConverter(511, 8)).toBe('777');
  });

  it('converts to hexadecimal (uppercase A–F)', () => {
    expect(baseConverter(255, 16)).toBe('FF');
    expect(baseConverter(4095, 16)).toBe('FFF');
    expect(baseConverter(48879, 16)).toBe('BEEF');
  });

  it('converts to base 36 (0-9, A-Z)', () => {
    expect(baseConverter(35, 36)).toBe('Z');
    expect(baseConverter(36, 36)).toBe('10');
    expect(baseConverter(123456789, 36)).toBe('21I3V9');
  });

  it('returns empty string for invalid bases', () => {
    expect(baseConverter(10, 1)).toBe('');
    expect(baseConverter(10, 37)).toBe('');
    expect(baseConverter(10, 0)).toBe('');
    expect(baseConverter(10, -2)).toBe('');
  });

  it('documents current behavior for zero and negatives (returns empty string)', () => {
    expect(baseConverter(0, 2)).toBe('');
    expect(baseConverter(-5, 2)).toBe('');
  });

  it('matches JS Number#toString(radix) for many values (uppercased)', () => {
    const nums = [1, 2, 3, 7, 10, 15, 31, 32, 63, 64, 127, 128, 255, 256, 1023, 1024, 65535];
    for (const n of nums) {
      for (let base = 2; base <= 36; base++) {
        const expected = n.toString(base).toUpperCase();
        const actual = baseConverter(n, base);
        expect(actual).toBe(expected);
      }
    }
  });

  it('handles larger integers', () => {
    const n = 2 ** 31 - 1;
    expect(baseConverter(n, 2)).toBe(n.toString(2).toUpperCase());
    expect(baseConverter(n, 16)).toBe(n.toString(16).toUpperCase());
    expect(baseConverter(n, 36)).toBe(n.toString(36).toUpperCase());
  });
});
