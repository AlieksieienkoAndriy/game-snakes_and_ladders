export class Button {
  constructor(buttonParams, textParams, scene) {
    this.scene = scene;
    this.active = true;

    this.sound = this.scene.sound.add('button');

    this.container = this.scene.add.container();

    this.button = this.scene.add.sprite(0, 0, 'atlas', buttonParams.texture);
    this.button.setInteractive();
    this.button.on('pointerdown', () => {
      this.sound.play();
      this.disable(true);

      this.scene.time.addEvent({
        delay        : 150,        
        callback     : () => {
          buttonParams.callback();

          if (this.active) {
            this.enable();
          }
        },
        callbackScope: this,
      });      

      this.scene.tweens.add({
        targets : [this.container],
        scaleX  : 0.96,
        scaleY  : 0.96,
        duration: 75,
        yoyo    : true,        
      });
    }, this.scene);
    this.container.add(this.button);    

    if (textParams) {
      this.buttonText = this.scene.add.text(0, 0, textParams.text, textParams.style);
      this.buttonText.setOrigin(0.5);
      this.container.add(this.buttonText);       
    }

     this.container.setPosition(buttonParams.x, buttonParams.y)  
  }

  disable(isActive) {
    this.active = isActive;

    this.container.alpha = 0.3    
    this.button.disableInteractive();
  }

  enable() {
    this.active = true;

    this.container.alpha = 1;   
    this.button.setInteractive();
  }
}