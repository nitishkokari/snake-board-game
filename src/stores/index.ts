import playerStore, { PlayerStore } from './player';
import snakeStore, { SnakeStore } from './snake';
import gameStore, { GameStore } from './game';

export type RootStore = {
  playerStore: PlayerStore;
  snakeStore: SnakeStore;
  gameStore: GameStore;
}

const rootStore: RootStore = {
  playerStore,
  snakeStore,
  gameStore
};

export default rootStore;
