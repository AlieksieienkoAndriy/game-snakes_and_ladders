import Phaser from 'phaser';

import { BootScene }    from './src/scenes/BootScene';
import { PreloadScene } from './src/scenes/PreloadScene';
import { StartScene }   from './src/scenes/StartScene';
import { GameScene }    from './src/scenes/GameScene';
import gameConfig       from './src/config';

export const config = {
    type: Phaser.AUTO,  
  
    scale: {
      mode      : Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width     : 2048,
      height    : 1366,
    },
    
    scene: [BootScene, PreloadScene, StartScene, GameScene],
    gameConfig, 
  }
  
let game = new Phaser.Game(config);
