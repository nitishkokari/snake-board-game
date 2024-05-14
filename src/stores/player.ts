import { makeObservable, observable } from 'mobx';
import React from 'react';
import {setPlayer} from '../lib/helpers';

export interface Player {
  name: string
  position: number
}

export class PlayerStore {
  constructor() {
    makeObservable(this);
  }

  player: Player[] = setPlayer()
}

export default new PlayerStore();
