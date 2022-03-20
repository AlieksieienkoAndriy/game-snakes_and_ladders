import Phaser from 'phaser';

import { config }          from '../../index';
import { Button }          from '../classes/Button';
import { InteractiveText } from '../classes/InteractiveText';

export class StartScene extends Phaser.Scene {
  constructor () {    
    super('Start');
    config

    this.config = config.gameConfig.startSettings;

    this.centerX = config.scale.width / 2;
    this.centerY = config.scale.height / 2;
  }  

  create () {    
    const {centerX, centerY} = this    

    this.background = this.add.image(centerX, centerY, 'bg');

    this.clickSound = this.sound.add('button');

    this.createMenu(); 
    this.createRules(); 
  }  

  createMenu() {
    const {centerX, centerY, config} = this
    
    const menu = this.add.container();

    const boardParams = config.menu.board;  
    const board =  this.add.image(0, 0, boardParams.texture);
    menu.add(board);
    
    const playTextParams = {
      ...config.menu.playText,
      callback: () => {
        this.clickSound.play();
        this.scene.start('Game');
      },
    }
    const playText = new InteractiveText(playTextParams, this);
    menu.add(playText);  
    
    const rulesTextParams = {
      ...config.menu.rulesText,
      callback: () => {
        this.clickSound.play();        
        this.rules.visible = true;
      },
    }
    const rulesText = new InteractiveText(rulesTextParams, this);        
    menu.add(rulesText);    

    menu.setPosition(centerX, centerY + boardParams.offsetY);   
  }

  createRules() {
    const {centerX, centerY, config} = this      

    this.rules = this.add.container();  

    const rulesBg = this.add.image(0, 0, 'table');
    this.rules.add(rulesBg);

    const scroll = this.add.image(0, 0, 'scroll');
    this.rules.add(scroll);

    const topTextParams = config.rules.topText;
    const topText = this.add.text(topTextParams.offsetX, topTextParams.offsetY, topTextParams.text, topTextParams.style);
    topText.setOrigin(0, 0.5);
    this.rules.add(topText);    
    
    const middleTextParams = config.rules.middleText;
    const middleText = this.add.text(middleTextParams.offsetX, middleTextParams.offsetY, middleTextParams.text, middleTextParams.style);
    middleText.setOrigin(0, 0.5);
    this.rules.add(middleText);
    
    const bottomTextParams = config.rules.bottomText;
    const bottomText = this.add.text(bottomTextParams.offsetX, bottomTextParams.offsetY, bottomTextParams.text, bottomTextParams.style);
    bottomText.setOrigin(0, 0.5);
    this.rules.add(bottomText);

    const finishParams = config.rules.finish;
    const finish = this.add.image(finishParams.x, topText.y, 'atlas', finishParams.texture);
    finish.setScale(finishParams.scale);
    this.rules.add(finish);

    const ladderParams = config.rules.ladder;
    const ladder = this.add.image(ladderParams.x, middleText.y, 'atlas', ladderParams.texture);
    ladder.setScale(ladderParams.scale);
    this.rules.add(ladder);
    
    const snakeParams = config.rules.snake;
    const snake = this.add.image(snakeParams.x, bottomText.y, 'atlas', snakeParams.texture);
    snake.setScale(snakeParams.scale);
    this.rules.add(snake);
    
    const exitButtonParams = {
      x       : (rulesBg.width / 2) - config.rules.exitButton.offset, 
      y       : -(rulesBg.height / 2) + config.rules.exitButton.offset, 
      texture : config.rules.exitButton.texture, 
      callback: () => this.rules.visible = false,
    };
    const exitButton = new Button(exitButtonParams, null, this);      
    this.rules.add(exitButton.container);
    
    this.rules.visible = false;

    this.rules.setPosition(centerX, centerY);
  }  
}