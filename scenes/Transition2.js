class Transition2 extends Phaser.Scene {
    constructor() {
        super('Transition2')
    }
    create() {
        this.add.text(game.config.width/3, game.config.height/3, "Level 2 Complete!").setFontSize(30);
        this.add.text(game.config.width/3 ,game.config.height/2, "Click For Next Level.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Scene3'));
        });
    }
}