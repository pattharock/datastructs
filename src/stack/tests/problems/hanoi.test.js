import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import {
  hanoi,
  hanoiIterative,
  initTowers,
  applyMove,
  simulateGame,
  printSnapshots,
} from '../../problems/hanoi.js';

function expectedMoveCount(n) {
  return Math.max(0, 2 ** n - 1);
}

describe('hanoi() vs hanoiIterative()', () => {
  it('n <= 0 yields no moves', () => {
    expect(hanoi(0, 'A', 'B', 'C')).toEqual([]);
    expect(hanoiIterative(0, 'A', 'B', 'C')).toEqual([]);
    expect(hanoi(-3, 'A', 'B', 'C')).toEqual([]);
  });

  it('n=1 moves once A->C', () => {
    const rec = hanoi(1, 'A', 'B', 'C');
    const itr = hanoiIterative(1, 'A', 'B', 'C');
    expect(rec).toEqual([['A', 'C']]);
    expect(itr).toEqual([['A', 'C']]);
  });

  it('n=2 same sequence & correct count', () => {
    const rec = hanoi(2, 'A', 'B', 'C');
    const itr = hanoiIterative(2, 'A', 'B', 'C');
    expect(rec).toEqual(itr);
    expect(rec.length).toBe(expectedMoveCount(2));
  });

  it('n=3 same sequence & correct count', () => {
    const rec = hanoi(3, 'A', 'B', 'C');
    const itr = hanoiIterative(3, 'A', 'B', 'C');
    expect(rec).toEqual(itr);
    expect(rec.length).toBe(expectedMoveCount(3));
  });

  it('n=4 same sequence & correct count', () => {
    const rec = hanoi(4, 'A', 'B', 'C');
    const itr = hanoiIterative(4, 'A', 'B', 'C');
    expect(rec).toEqual(itr);
    expect(rec.length).toBe(expectedMoveCount(4));
  });
});

describe('initTowers()', () => {
  it('initializes A with n..1 and B,C empty; string format matches stack toString()', () => {
    const { A, B, C } = initTowers(3);
    expect(A.toString()).toBe('[3, 2, 1]');
    expect(B.toString()).toBe('');
    expect(C.toString()).toBe('');
    expect(A.size()).toBe(3);
  });

  it('n=0 starts all empty', () => {
    const { A, B, C } = initTowers(0);
    expect(A.toString()).toBe('');
    expect(B.toString()).toBe('');
    expect(C.toString()).toBe('');
  });
});

describe('applyMove()', () => {
  it('moves the top disk when legal', () => {
    const towers = initTowers(2);
    applyMove(towers, 'A', 'B');
    expect(towers.A.toString()).toBe('[2]');
    expect(towers.B.toString()).toBe('[1]');
    expect(towers.C.toString()).toBe('');
  });

  it('throws for unknown labels', () => {
    const towers = initTowers(1);
    expect(() => applyMove(towers, 'X', 'A')).toThrow(/Unknown tower label/);
    expect(() => applyMove(towers, 'A', 'Z')).toThrow(/Unknown tower label/);
  });

  it('throws when moving from empty tower', () => {
    const towers = initTowers(0);
    expect(() => applyMove(towers, 'A', 'B')).toThrow(/is empty/);
  });

  it('throws on illegal move (bigger onto smaller)', () => {
    const towers = initTowers(2);
    applyMove(towers, 'A', 'B');
    expect(() => applyMove(towers, 'A', 'B')).toThrow(/Illegal move/);
  });
});

describe('simulateGame()', () => {
  it('n=0 has no moves, snapshot 0 only', () => {
    const { moves, snapshots, towers } = simulateGame(0);
    expect(moves).toEqual([]);
    expect(snapshots.length).toBe(1);
    expect(snapshots[0]).toMatchObject({ move: 0, from: '', to: '' });
    expect(towers.A.toString()).toBe('');
    expect(towers.B.toString()).toBe('');
    expect(towers.C.toString()).toBe('');
  });

  it('n=3 produces 2^3 - 1 moves and ends with all disks on C', () => {
    const { moves, snapshots, towers } = simulateGame(3);
    expect(moves.length).toBe(7);
    expect(snapshots.length).toBe(8);
    expect(towers.A.toString()).toBe('');
    expect(towers.B.toString()).toBe('');
    expect(towers.C.toString()).toBe('[3, 2, 1]');
  });

  it('iterative sequence equals recursive sequence', () => {
    const rec = hanoi(3, 'A', 'B', 'C');
    const { moves: itr } = simulateGame(3);
    expect(itr).toEqual(rec);
  });
});

describe('printSnapshots()', () => {
  let spy;

  beforeEach(() => {
    spy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('prints header + A/B/C + blank line for each snapshot', () => {
    const { snapshots } = simulateGame(2);

    printSnapshots(snapshots);

    const n = snapshots.length;
    expect(spy).toHaveBeenCalledTimes(n * 5);

    for (let i = 0; i < n; i++) {
      const base = i * 5;
      const headerArg = spy.mock.calls[base][0];
      if (snapshots[i].move === 0) {
        expect(headerArg).toBe('SIMULATION BEGINS');
      } else {
        const { move, from, to } = snapshots[i];
        expect(headerArg).toMatch(new RegExp(`^Move ${move}: ${from} -> ${to}$`));
      }

      expect(spy.mock.calls[base + 1][0]).toMatch(/^A:\s/);
      expect(spy.mock.calls[base + 2][0]).toMatch(/^B:\s/);
      expect(spy.mock.calls[base + 3][0]).toMatch(/^C:\s/);
      expect(spy.mock.calls[base + 4].length).toBe(0);
    }

    const lastHeaderIdx = (n - 1) * 5;
    const lastMove = snapshots[n - 1].move;
    expect(spy.mock.calls[lastHeaderIdx][0]).toMatch(new RegExp(`^Move ${lastMove}:`));
  });

  it('prints nothing for empty snapshots array', () => {
    printSnapshots([]);
    expect(spy).not.toHaveBeenCalled();
  });
});
