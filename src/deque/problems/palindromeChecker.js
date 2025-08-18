import { CircularBuffer } from '../ds/circularBuffer.js';

export function palindromeChecker(aString) {
  if (aString === undefined || aString === null || (aString !== null && aString?.length === 0)) {
    return false;
  }

  const dq = new CircularBuffer();
  const processedString = aString.toLowerCase().split(' ').join('');

  for (let i = 0; i < processedString.length; i++) {
    dq.pushBack(processedString.charAt(i));
  }

  while (dq.size() > 1) {
    if (dq.popFront() !== dq.popBack()) {
      return false;
    }
  }

  return true;
}
