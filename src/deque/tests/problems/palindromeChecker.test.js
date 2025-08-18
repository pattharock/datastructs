import { describe, it, expect } from 'vitest';
import { palindromeChecker } from '../../problems/palindromeChecker.js';

describe('palindromeChecker', () => {
  it('odd-length palindrome (simple)', () => {
    expect(palindromeChecker('racecar')).toBe(true);
  });

  it('even-length palindrome (simple)', () => {
    expect(palindromeChecker('abba')).toBe(true);
  });

  it('single character is a palindrome', () => {
    expect(palindromeChecker('x')).toBe(true);
  });

  it('ignores spaces and is case-insensitive', () => {
    expect(palindromeChecker('A man a plan a canal Panama')).toBe(true);
  });

  it('non-palindrome returns false', () => {
    expect(palindromeChecker('abca')).toBe(false);
    expect(palindromeChecker('abc')).toBe(false);
  });

  it('empty string returns false (per implementation)', () => {
    expect(palindromeChecker('')).toBe(false);
  });

  it('null and undefined return false', () => {
    expect(palindromeChecker(null)).toBe(false);
    expect(palindromeChecker(undefined)).toBe(false);
  });

  it('strings with punctuation are NOT normalized (current behavior)', () => {
    expect(palindromeChecker("Madam, I'm Adam")).toBe(false);
    expect(palindromeChecker('Never odd, or even.')).toBe(false);
  });

  it('string of only spaces returns true (current behavior)', () => {
    expect(palindromeChecker('     ')).toBe(true);
  });

  it('handles long palindromes', () => {
    const s = 'x'.repeat(5000);
    expect(palindromeChecker(s)).toBe(true);
  });

  it('handles long non-palindromes', () => {
    const s = 'x'.repeat(5000) + 'y';
    expect(palindromeChecker(s)).toBe(false);
  });
});
