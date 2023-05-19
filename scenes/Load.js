class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        this.load.image('fireGirl', 'fireGirl.png');
        this.load.image('waterBoy' , 'waterBoy.png');
    }

    create() {
        
        this.scene.start('Scene1');
    }
}