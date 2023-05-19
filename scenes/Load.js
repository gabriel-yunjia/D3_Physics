class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        this.load.image('fireGirl', 'fireGirl.png');
        this.load.image('waterBoy' , 'waterBoy.png');
        this.load.image('groundTile', 'groundTile.png');
        this.load.image('blueDoor', 'blueDoor.png');
        this.load.image('redDoor', 'redDoor.png');
        this.load.image('greenDoor', 'greenDoor.png');
    }

    create() {
        
        this.scene.start('Scene1');
    }
}