export function generateMatrix() {
  const matrixArray = []
  const number = 10
  let block = (number * number) + 1

  let rows: number = 10;
  let cols: number = 10;
  let arr: number[][] = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      block = block - 1
      arr[i][j] = block
    }
    if (i % 2 != 0) {
      arr[i] = arr[i].reverse()
    }
  }
  return arr
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function rollDice(gameStore) {
  const isCrooked = Math.random() < 0.5

  if (isCrooked) {
    gameStore.diceVal = getRandomNumber(1, 3) *  2;
  } else {
    gameStore.diceVal = getRandomNumber(1, 6)
  }

  return gameStore.diceVal
}

export interface Snake {
  id: number
  start: number
  end: number
}

export function generateSnakes(snakeCount: number) {
  const snakes: Snake[] = [];

  for (let i = 0; i < snakeCount; i++) {
    let start = 0;

    do {
      start = getRandomNumber(10, 100 - 1);
    } while (snakes.findIndex((s) => s.start == start) != -1);

    const end = getRandomNumber(0, start - 2);
    snakes.push({ id: i+1, start, end });
  }

  return snakes
}

export function movePlayer(player, diceValue, snakes){
  let snake

  const position = player.position

  if (position == 0 && diceValue == 6) {
    player.position = position + 1
  } else if (position != 0 && (position + diceValue <= 100)) {
    player.position = position + diceValue
  }

  snakes.find((s) => {
    if (s.start == player.position) {
      snake = s
      player.position = s.end
    }
  })

  if (snake) {
    return snake
  }

  return false
}

export interface Player {
  name: string
  position: number
}

export function setPlayer() {
  let player: Player[] = [];
  player['name'] = 'Player1'
  player['position'] = 0
  return player
}

const SNAKE_COUNT = 6

export function updateGameStatus(gameState, DiceRoll, snakeBit, playerStore, position, newPosition, value) {
  let initial, playerPosition, gameStatus = ''

  initial = `${DiceRoll}: Dice value ${value} `

  if (snakeBit) {
    snakeBit = `, Snake Bite at ${value+position}`
  } else {
    snakeBit = ''
  }
  if (newPosition == 0) {
    playerPosition = `, ${playerStore.player['name']} at the beginning`
  }
  if (position != newPosition) {
    playerPosition = `, ${playerStore.player['name']} moved from ${snakeBit? value+position : position} to ${playerStore.player['position']}`
  }

  if (newPosition != 0 && position == newPosition) {
    playerPosition = `, ${playerStore.player['name']} need ${100-playerStore.player['position']} to win`
  }

  if (newPosition == 100) {
    gameStatus = `, ${playerStore.player['name']} has WON!`
    gameState.started = false
    gameState.updates = []
    playerStore.player['position'] = 0
    gameState.started = false;
    generateSnakes(SNAKE_COUNT)
  }

  gameState.updates.push(initial + snakeBit + playerPosition + gameStatus)
}

