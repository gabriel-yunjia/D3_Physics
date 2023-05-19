class Ending extends Phaser.Scene {
    constructor() {
        super('Ending')
    }
    create() {
        this.add.text(game.config.width/8, game.config.height/3, "Level 3 Complete! Thanks For Playing!").setFontSize(30);
        this.add.text(game.config.width/3 ,game.config.height/2, "Click to Restart.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Scene1'));
        });

                // Scene Switcher
                this.input.keyboard.on('keydown', (event) => {
                    //console.log(event);
                    switch(event.key) {
                        case '1':
                            this.scene.start('Scene1');
                            break;
                        case '2':
                            this.scene.start('Scene2');
                            break;
                        case '3':
                            this.scene.start('Scene3');
                            break;
                        case '4':
                            this.scene.start('Transition1');
                            break;
                        case '5':
                            this.scene.start('Transition2');
                            break;
                        case '6':
                            this.scene.start('Ending');
                            break;
                        case 'r':
                            this.scene.start('Scene1');
                            break;
        
                     }
                });
    }
}