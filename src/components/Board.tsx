import {action, observable} from "mobx"
import React from "react"
import { generateMatrix, movePlayer, rollDice, updateGameStatus } from '../lib/helpers'

import { useStore } from '../store'
import {observer} from "mobx-react-lite"

let DiceRoll = 0

type GameState = {
  started: boolean,
  snakes: Snake[],
  updates: string[]
}

export interface Snake {
  start: number;
  end: number;
}

let gameState: GameState = observable({
  started: false,
  snakes: [],
  updates: []
})

interface BoardColumnProps {
  column: number[],
  snakes: Snake[]
};

interface BlockCellProps {
  row: number,
  snakes: Snake[],
  index: number
};

function BlockCell(props: BlockCellProps) {
  const { playerStore } = useStore()
  const {snakes, row, index} = props
  let snake, snakeHead, snaketail, snakeId, addClass

  snake = snakes.find((s) => s.start === row || s.end === row)

  if (typeof snake !== 'undefined') {
    snakeId = snake.id ? snake.id : ''
    snakeHead = snake.start == row ? row : ''
    snaketail = snake.end == row ? row : ''
  }

  if (snakeHead) {
    addClass = "snakeHead"
  } else if (snaketail) {
    addClass = "snakeTail"
  }

  return (
    <div key={index} id={"row-id-"+row} className={"wrapperBlock " + addClass}>
      <span className="head">{snakeHead ? snakeId : ''}</span>
      <span className="tail">{snaketail ? snakeId : ''}</span>
      {
        index % 2 == 0 && (
          <span className="rowVal">{row}</span>
        ) ||
        index % 2 != 0 && (
          <span className="rowVal">{row}</span>
        )
      }
      {
        playerStore.player['position'] === row && (
          <div id="circle"></div>
        )
      }
    </div>
  )
}

function Block(props: BoardColumnProps) {
  const {column, snakes} = props

  return (
    <div key={column[0]} className="divide-x flex">
      {column.map((row, index) => (
        <BlockCell snakes={snakes} index={index} row={row}/>
      ))}
    </div>
  )
}

function Board() {
  const matrixArray = generateMatrix()
  const { playerStore, snakeStore, gameStore } = useStore()
  const snakes = snakeStore.getSnakes()
  let snakeBit, value

  if (!gameState.started) {
    DiceRoll = 0
  }

  return (
    <div className="boardWrapper">
      {!gameState.started &&
        <div className="player-wrapper divide-x flex">
          <button
            className="default-button start-game"
            role="button"
            onClick={action((e) => {
              gameState.started = true
              gameState.updates = []
            })}
          >
            Start Game
          </button>
        </div>
      }
      <div className="divide-x flex board">
        {matrixArray.map((column, index) => (
          <Block snakes={snakes} key={index} column={column}/>
        ))}
      </div>
      <div className="divide-x flex snakeInfo">
        <div className="snakeHeadInfo">
          Snake Head:
          <span>
            O
          </span>
        </div>
        <div className="snakeTailInfo">
          Snake Tail: &nbsp;&nbsp;
          <span>
            O
          </span>
        </div>
      </div>
      { gameState.started &&
        <div className="diceWrapper">
          <button
            type="button"
            className="diceButton"
            onClick={() => {
              value = rollDice(gameStore)
              DiceRoll += 1

              const oldPosition = playerStore.player['position']
              snakeBit = movePlayer(playerStore.player, value, snakes)

              updateGameStatus(gameState, DiceRoll, snakeBit, playerStore, oldPosition, playerStore.player['position'], value)
            }}
          >
            Roll it
          </button>
          <span className="diceValue">Dice Value: {gameStore.diceVal}</span>
        </div>
      }
      <div className="gameStatus">
        {gameState.updates.slice().reverse().map((item, index) => (
          <div className="historyItem">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(Board)
