export class Player {
  constructor(scene, params) {
    this.scene = scene;
    this.params = params;
    this.name = params.name;
    this.count = 0;

    this.token = this.scene.add.sprite(params.token.x, params.token.y, 'atlas', params.token.texture)
    if (params.token.scale) {
      this.token.setScale(params.token.scale);
    }    
  }

  moveToken() {    
    this.count++
       
    let space = this.scene.spaces[this.count];

    this.scene.moveSound.play({delay: 0.5});

    this.scene.tweens.add({
      targets : [this.token],
      x       : space.x + this.params.token.offset,
      y       : space.y + this.params.token.offset,
      duration: 500,
      
      onComplete: () => {
        this.scene.diceValue--;
        
        if (this.scene.diceValue > 0 && this.count !== 99) {
          this.moveToken();
        } else {
          this.finishMove(space);
        }
      }
    });
  }

  finishMove(space) {
    if (space.isFinish) {      
      this.scene.gameOverEvent.emit('gameOver', this);
      return;
    }

    if (space.hasOwnProperty('moveTo')) {
      console.log();
      if (this.count < space.moveTo) {
        this.scene.ladderSound.play();
      } else {
        this.scene.snakeSound.play();
      }

      this.count = space.moveTo;

      let targetSpace = this.scene.spaces[this.count];

      this.scene.tweens.add({
        targets : [this.token],
        x       : targetSpace.x + this.params.token.offset,
        y       : targetSpace.y + this.params.token.offset,
        duration: 500,
        
        onComplete: () => {
          this.scene.finishedMoveEvent.emit('finishedMove', this);
        },
      });
    } else {
      this.scene.finishedMoveEvent.emit('finishedMove', this);
    }
  }
}