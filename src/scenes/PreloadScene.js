import Phaser         from 'phaser';

import { LoadingBar } from '../classes/LoadingBar';
import {config} from '../../index';

export class PreloadScene extends Phaser.Scene {
  constructor() {
      super('Preload');
  }
  preload() {  
    config  
    this.background = this.add.image(config.scale.width / 2, config.scale.height / 2, 'bg_blur');
    const loadingBar = new LoadingBar(this);

    this.load.image('bg', './assets/sprites/background.jpg');
    this.load.image('finalBg', './assets/sprites/bg_black.jpg');
    this.load.image('menu', './assets/sprites/menu.png');

    this.load.image('table', './assets/sprites/gameBg.jpg');
    this.load.image('scroll', './assets/sprites/scroll.png');
    this.load.image('final_table', './assets/sprites/final_table.png');
    this.load.image('board', './assets/sprites/board.png'); 

    this.load.atlas('atlas', './assets/sprites/atlas.png', './assets/sprites/atlas.json')

    this.load.spritesheet('dice', './assets/sprites/dice.png', {
      frameWidth : 75,
      frameHeight: 75,
    })
  }
  create() {
     this.scene.start('Start');
  }

  update() {
    
  }
} 