import { CircularBuffer } from '../ds/circularBuffer';

export function hotPotato(elementList, num) {
  let dq = new CircularBuffer();
  let eliminated = [];

  for (const e of elementList) {
    dq.pushBack(e);
  }

  while (dq.size() > 1) {
    for (let i = 0; i < num; i++) {
      dq.pushBack(dq.popFront());
    }

    eliminated.push(dq.popFront());
  }

  return {
    winner: dq.popFront(),
    eliminated,
  };
}
