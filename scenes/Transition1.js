class Transition1 extends Phaser.Scene {
    constructor() {
        super('Transition1')
    }
    create() {
        this.add.text(game.config.width/3, game.config.height/3, "Level 1 Complete!").setFontSize(30);
        this.add.text(game.config.width/3 ,game.config.height/2, "Click For Next Level.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Scene2'));
        });
    }
}