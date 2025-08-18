import { describe, expect, it } from 'vitest';

import { hotPotato } from '../../problems/hotPotato';

describe('hotPotato', () => {
  it('classic small case (num=3)', () => {
    const players = ['A', 'B', 'C', 'D', 'E'];
    const result = hotPotato(players, 3);
    expect(result).toEqual({
      winner: 'A',
      eliminated: ['D', 'C', 'E', 'B'],
    });
    expect(players).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('another case (num=7) to catch off-by-one errors', () => {
    const players = ['A', 'B', 'C', 'D', 'E'];
    const result = hotPotato(players, 7);
    expect(result).toEqual({
      winner: 'A',
      eliminated: ['C', 'B', 'E', 'D'],
    });
  });

  it('num larger than list length (num=10, 4 players)', () => {
    const players = ['A', 'B', 'C', 'D'];
    const result = hotPotato(players, 10);
    expect(result).toEqual({
      winner: 'D',
      eliminated: ['C', 'A', 'B'],
    });
  });

  it('num = 1 (eliminates the next player each round)', () => {
    const players = ['A', 'B', 'C'];
    const result = hotPotato(players, 1);
    expect(result).toEqual({
      winner: 'C',
      eliminated: ['B', 'A'],
    });
  });

  it('num = 0 behaves like passing zero times then eliminating front', () => {
    const players = ['A', 'B', 'C'];
    const result = hotPotato(players, 0);
    expect(result).toEqual({
      winner: 'C',
      eliminated: ['A', 'B'],
    });
  });

  it('negative num behaves like 0 (inner loop does not run)', () => {
    const players = ['A', 'B', 'C'];
    const result = hotPotato(players, -2);
    expect(result).toEqual({
      winner: 'C',
      eliminated: ['A', 'B'],
    });
  });

  it('single player: winner is the only player, no eliminations', () => {
    const players = ['Solo'];
    const result = hotPotato(players, 5);
    expect(result).toEqual({
      winner: 'Solo',
      eliminated: [],
    });
  });

  it('empty list: winner is undefined, eliminated is empty', () => {
    const players = [];
    const result = hotPotato(players, 3);
    expect(result).toEqual({
      winner: undefined,
      eliminated: [],
    });
  });
});
