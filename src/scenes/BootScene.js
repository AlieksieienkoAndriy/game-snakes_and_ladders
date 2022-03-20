import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
      super('Boot');
  }
  preload() {
    this.load.image('bg_blur', './assets/sprites/blurBg.jpg')
    
  }
  create() {
     this.scene.start('Preload')
  }   
}