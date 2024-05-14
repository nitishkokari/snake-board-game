import { makeObservable, observable } from 'mobx';
import React from 'react';

export class GameStore {
  constructor() {
    makeObservable(this);
  }

  updates: string[] = []

  diceVal: number[] = []
}

export default new GameStore();
