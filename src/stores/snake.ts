import { makeObservable, observable } from 'mobx';
import React from 'react';
import { generateSnakes } from '../lib/helpers';

const SNAKE_COUNT = 6

export interface Snake {
  id: number
  start: number;
  end: number;
}

export class SnakeStore {
  constructor() {
    makeObservable(this, {
      getSnakes: observable,
    });
  }

  snakes: Snake[] = generateSnakes(SNAKE_COUNT)

  getSnakes = () => {
    return this.snakes
  }
}

export default new SnakeStore();
