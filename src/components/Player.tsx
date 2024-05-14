import { makeObservable, observable } from "mobx";

class Player {
  name: string
  position: number

  constructor(name: string, position: number){
    this.name = name;
    this.position = position;

    makeObservable(this, {
      name: observable,
      position: observable,
    })
  }
}

export default Player
