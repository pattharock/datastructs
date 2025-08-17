import { Stack } from '../ds/stackObject.js';

export function hanoi(n, source, helper, destination, moves = []) {
  if (n <= 0) return moves;
  if (n === 1) {
    moves.push([source, destination]);
  } else {
    hanoi(n - 1, source, destination, helper, moves);
    moves.push([source, destination]);
    hanoi(n - 1, helper, source, destination, moves);
  }
  return moves;
}

export function hanoiIterative(n, source, helper, destination) {
  const moves = [];
  const callStack = new Stack();

  callStack.push({ n, source, helper, destination });

  while (!callStack.isEmpty()) {
    const { n, source, helper, destination } = callStack.pop();

    if (n <= 0) continue;

    if (n === 1) {
      moves.push([source, destination]);
      continue;
    }

    callStack.push({ n: n - 1, source: helper, helper: source, destination });
    callStack.push({ n: 1, source, helper, destination });
    callStack.push({ n: n - 1, source, helper: destination, destination: helper });
  }

  return moves;
}

export function initTowers(n) {
  const A = new Stack('A');
  const B = new Stack('B');
  const C = new Stack('C');

  for (let i = n; i >= 1; i--) A.push(i);

  return { A, B, C };
}

export function applyMove(towers, fromLabel, toLabel) {
  const from = towers[fromLabel];
  const to = towers[toLabel];

  if (!from || !to) {
    throw new Error(`Unknown tower label ${fromLabel} -> ${toLabel}`);
  }
  if (from.isEmpty()) {
    throw new Error(`Tower ${fromLabel} is empty!!`);
  }

  const disk = from.peek();
  const toTop = to.peek();

  if (toTop !== undefined && disk > toTop) {
    throw new Error(
      `Illegal move ${fromLabel} -> ${toLabel}: Can not move ${disk} on smaller disk ${toTop}`
    );
  }

  to.push(from.pop());
}

export function simulateGame(n) {
  const towers = initTowers(n);
  const moves = hanoiIterative(n, 'A', 'B', 'C');
  const snapshots = [
    {
      move: 0,
      A: towers.A.toString(),
      B: towers.B.toString(),
      C: towers.C.toString(),
      from: '',
      to: '',
    },
  ];

  moves.forEach((move, idx) => {
    const [sourceLabel, destinationLabel] = move;
    applyMove(towers, sourceLabel, destinationLabel);
    snapshots.push({
      move: idx + 1,
      A: towers.A.toString(),
      B: towers.B.toString(),
      C: towers.C.toString(),
      from: sourceLabel,
      to: destinationLabel,
    });
  });

  return { moves, snapshots, towers };
}

export function printSnapshots(snapshots) {
  for (const s of snapshots) {
    if (s.move === 0) {
      console.log(`SIMULATION BEGINS`);
    } else {
      console.log(`Move ${s.move}: ${s.from} -> ${s.to}`);
    }
    console.log(`A: ${s.A}`);
    console.log(`B: ${s.B}`);
    console.log(`C: ${s.C}`);
    console.log();
  }
}
