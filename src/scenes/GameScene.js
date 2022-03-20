import Phaser     from "phaser";

import {config}   from '../../index';
import { Button } from "../classes/Button";
import { Player } from "../classes/Player";

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');

    this.centerX = config.scale.width / 2;
    this.centerY = config.scale.height / 2;    

    this.config = config.gameConfig.gameSettings;
  }

  create() {    
    const {centerX, centerY, config} = this;    

    this.background = this.add.image(centerX, centerY, 'table');

    this.board = this.add.image(centerX * 2 - config.board.offsetX, centerY, config.board.texture);
    this.board.setOrigin(1, 0.5);
      
    const tableCenterX = this.board.getBounds().left / 2;    
    
    this.dice = this.add.sprite(tableCenterX, this.background.height / 2, config.dice.texture, 13);
    this.dice.setScale(config.dice.scale);

    this.createButtons();    
    this.createAnims();
    this.createSpaces();
    this.createPlayers();
    this.createEventListeners();
    this.createSounds();    
  }

  createButtons() {
    const {board, dice, config} = this;
    
    const tableCenterX = board.getBounds().left / 2;    

    const exitButtonParams = {
      x       : config.exitButton.x, 
      y       : config.exitButton.y, 
      texture : config.exitButton.texture, 
      callback: () => {        
        this.soundtrack.stop();
        this.scene.start('Start');
      },
    };
    const firstButtonParams = {
      x       : tableCenterX, 
      y       : dice.getBounds().top + config.firstButton.offsetY, 
      texture : config.firstButton.texture, 
      callback: () => {
        this.roll(this.firstPlayer, this.firstButton);
      },
    };
    const secondButtonParams = {
      x       : tableCenterX, 
      y       : dice.getBounds().bottom + config.secondButton.offsetY, 
      texture : config.secondButton.texture, 
      callback: () => {
        this.roll(this.secondPlayer, this.secondButton);
      },
    };   
   
    this.exitButton = new Button(exitButtonParams, null, this);    
    this.firstButton = new Button(firstButtonParams, config.firstButton.textParams, this);
    this.secondButton = new Button(secondButtonParams, config.secondButton.textParams, this);      
    
    this.secondButton.disable();
  }

  createAnims() {
    let startFrame = 9;
    for (let i = 0; i < 6; i++) {
      this.anims.create({
        key: '' + (i + 1),
        frames: [
          { key: 'dice', frame: 0 },
          { key: 'dice', frame: 1 },
          { key: 'dice', frame: 2 },
          { key: 'dice', frame: 3 },
          { key: 'dice', frame: 4 },
          { key: 'dice', frame: 5 },
          { key: 'dice', frame: 6 },
          { key: 'dice', frame: 7 },
          { key: 'dice', frame: 8 },
          { key: 'dice', frame: startFrame },
      ],
        frameRate: 8,
        repeat: false,
      });

      startFrame++;
    }
  }

  createSpaces() {
    this.spaces = [];
    const spacesParams = this.config.spaces;

    for (let i = 0; i < spacesParams.col; i++) {
      let k = i % 2 === 0 ? 1 : -1;
      let startX = i % 2 === 0 ? spacesParams.startPos.x : spacesParams.startPos.x + (spacesParams.width * (spacesParams.row - 1));
      let startY = spacesParams.startPos.y;

      for (let j = 0; j < spacesParams.row; j++) {
        let space = {
          x: startX + (j * spacesParams.width * k),
          y: startY - (i * spacesParams.height),
        }

        this.spaces.push(space);
      }
    }

    const moving = spacesParams.moving;
    Object.keys(moving).forEach((space) => {
      this.spaces[space].moveTo = moving[space];
    })
    
    this.spaces[this.spaces.length - 1].isFinish = true;   
  }

  createPlayers() {
    const startSpace = this.spaces[0];

    const firstPlayerParams = {
      name : this.config.firstPlayer.name,
      token: {
        x      : startSpace.x + this.config.firstPlayer.token.offset, 
        y      : startSpace.y + this.config.firstPlayer.token.offset,
        offset : this.config.firstPlayer.token.offset, 
        texture: this.config.firstPlayer.token.texture, 
        scale  : this.config.firstPlayer.token.scale,
      },       
    };
    const secondPlayerParams = {
      name : this.config.secondPlayer.name,
      token: {
        x      : startSpace.x + this.config.secondPlayer.token.offset, 
        y      : startSpace.y + this.config.secondPlayer.token.offset,
        offset : this.config.secondPlayer.token.offset, 
        texture: this.config.secondPlayer.token.texture, 
        scale  : this.config.secondPlayer.token.scale,
      },  
    };

    this.firstPlayer = new Player(this, firstPlayerParams);
    this.secondPlayer = new Player(this, secondPlayerParams);   
  }

  createEventListeners() {
    this.rollEvent = new Phaser.Events.EventEmitter();
    this.rollEvent.on('roll', (button) => {  
      button.disable();
    }, this);

    this.finishedMoveEvent = new Phaser.Events.EventEmitter();
    this.finishedMoveEvent.on('finishedMove', (player) => {      
      if (player.name === 'firstPlayer') {
        this.secondButton.enable();
      } else {
        this.firstButton.enable();
      }  
    }, this);

    this.gameOverEvent = new Phaser.Events.EventEmitter();
    this.gameOverEvent.on('gameOver', this.showFinalWindow, this);
  }

  createSounds() {
    this.soundtrack = this.sound.add('theme');
    this.soundtrack.play({
      volume: 0.3,
      loop  : true,
    });
    this.moveSound = this.sound.add('step');
    this.ladderSound = this.sound.add('ladder');
    this.snakeSound = this.sound.add('snake');    
    this.diceSound = this.sound.add('dice');
    this.winSound = this.sound.add('win');
  }

  roll(player, button) {
    this.rollEvent.emit('roll', button);

    this.diceValue = Phaser.Math.Between(1, 6);    

    this.dice.play('' + this.diceValue);
    this.diceSound.play({delay: 0.2,});

    this.time.addEvent({
      delay        : 2000,
      callback     : () => {
        player.moveToken();
      },
      callbackScope: this,  
    });
  }
  
  showFinalWindow(player) {
    this.soundtrack.stop();
    this.winSound.play();

    this.bg = this.add.image(this.centerX, this.centerY, 'finalBg');   
    this.bg.alpha = 0.9;

    const table = this.add.image(this.centerX, this.centerY, 'final_table');

    const wonTextParama = this.config.finalWindow.wonText;
    const wonText = this.add.text(0, 0, wonTextParama.text, wonTextParama.style);
    wonText
      .setX(this.centerX - (wonText.width / 2))
      .setY(this.centerY - (wonText.height / 2) - wonTextParama.offsetY);

    let textParams = {};
    if (player.name === 'firstPlayer') {
      textParams.text = 'FIRST PLAYER';
      textParams.color = '#ff2d2d';
    } else {
      textParams.text = 'SECOND PLAYER';
      textParams.color = '#2f57ef';
    }

    const playerText = this.add.text(0, 0, textParams.text, this.config.finalWindow.wonText.style);
    playerText
      .setX(this.centerX - (playerText.width / 2))
      .setY(this.centerY - (playerText.height / 2) + wonTextParama.offsetY);
    
    playerText.setColor(textParams.color);

    const buttonParams = {
      x       : this.centerX, 
      y       : this.centerY + this.config.finalWindow.button.offsetY, 
      texture : this.config.finalWindow.button.texture, 
      callback: () => { 
        this.scene.restart();
      },      
    };

    const button = new Button(buttonParams, this.config.finalWindow.button.textParams, this);     
  }
}