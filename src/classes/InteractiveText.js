export class InteractiveText extends Phaser.GameObjects.Text {
  constructor(textParams, scene) {
    super(scene, textParams.x, textParams.y, textParams.text, textParams.style)

    this.scene.add.existing(this);
    this.setOrigin(0.5);
    
    this.setInteractive();    
    this.on('pointerup', textParams.callback, this.scene);

    this.on('pointerover', () => {
      this.setStyle({fill: textParams.style.fillHover});
    });

    this.on('pointerout', () => {
      this.setStyle({fill: textParams.style.fill});
    });
  }
}