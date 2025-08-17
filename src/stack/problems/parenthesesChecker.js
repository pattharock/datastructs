import { Stack } from '../ds/stackObject';

export function parenthesesChecker(symbols) {
  const parenthesesMap = { ')': '(', ']': '[', '}': '{' };

  const openers = new Set(Object.values(parenthesesMap));
  const closers = new Set(Object.keys(parenthesesMap));

  const stack = new Stack();

  for (const ch of symbols) {
    if (openers.has(ch)) {
      stack.push(ch);
    } else if (closers.has(ch)) {
      if (stack.isEmpty() || stack.pop() !== parenthesesMap[ch]) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}
