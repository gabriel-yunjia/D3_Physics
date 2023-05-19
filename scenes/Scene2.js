class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }

    create() {
        // variables and settings

        this.buttonPressed = false;
        this.purpleButtonPressed = false;
        this.keys = this.input.keyboard.addKeys("W,A,S,D,UP,LEFT, RIGHT");
        this.ACCELERATION = 999999;
        this.MAX_X_VEL = 250;   // pixels/second
        this.MAX_Y_VEL = 5000;
     
        this.JUMP_VELOCITY = -950;
        this.physics.world.gravity.y = 3000;

        // set bg color
        // draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // print Scene name
        this.add.text(game.config.width/2, 30, 'Level2', { font: '14px Futura', fill: '#FFFFFF' }).setOrigin(0.5);
        
    

        // make ground tiles group
        this.ground = this.add.group();
        // Ground Floor
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Middle Wall
        for(let i = tileSize; i < game.config.height-tileSize*2; i += tileSize) {
            let groundTile = this.physics.add.sprite(game.config.width/2, i + tileSize*2, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = tileSize; i < game.config.height-tileSize*2; i += tileSize) {
            let groundTile = this.physics.add.sprite(game.config.width/2-tileSize, i + tileSize*2, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        // Red Door Platfoorm
        for(let i = 0; i < game.config.width-tileSize*17; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Blue Door Platform
        for(let i = game.config.width-tileSize; i > game.config.width-tileSize*8; i -= tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;   
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // set up doors
        this.redDoor = this.physics.add.sprite(tileSize*2, tileSize*4 + 6, 'redDoor').setScale(SCALE).setOrigin(0);
        this.redDoor.body.allowGravity = false;
        this.redDoor.body.onOverlap = true;
        this.blueDoor = this.physics.add.sprite(tileSize*21, tileSize*4 + 6, 'blueDoor').setScale(SCALE).setOrigin(0);
        this.blueDoor.body.allowGravity = false;
        this.blueDoor.body.immovable = true;


        // setup platforms
        this.platform = this.physics.add.sprite(game.config.width/2-tileSize*3, game.config.height - tileSize*2 , 'platform').setScale(SCALE).setOrigin(0);
        this.platform.body.allowGravity = false;
        this.platform.body.immovable = true;
        this.purplePlatform = this.physics.add.sprite(game.config.width/2+tileSize*1, game.config.height - tileSize*2 , 'purplePlatform').setScale(SCALE).setOrigin(0);
        this.purplePlatform.body.allowGravity = false;
        this.purplePlatform.body.immovable = true;
        

        // setup buttons

        this.button = this.physics.add.sprite(game.config.width/2+tileSize*4, game.config.height - tileSize*2 , 'button').setScale(SCALE).setOrigin(0);
        this.button.body.allowGravity = false;
        this.button.body.immovable = true;
        this.purpleButton = this.physics.add.sprite(game.config.width/2-tileSize*7 , game.config.height - tileSize*10 , 'purpleButton').setScale(SCALE).setOrigin(0);
        this.purpleButton.body.allowGravity = false;
        this.purpleButton.body.immovable = true;

        // set up Main Characters 
        this.waterBoy = this.physics.add.sprite(game.config.width - tileSize*4, game.config.height - tileSize*2, 'waterBoy').setScale(SCALE);
        this.waterBoy.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.waterBoy.setCollideWorldBounds(true);
        this.fireGirl = this.physics.add.sprite(tileSize*4, game.config.height - tileSize*2, 'fireGirl').setScale(SCALE);
        this.fireGirl.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.fireGirl.setCollideWorldBounds(true);

        

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.waterBoy, this.ground);
        this.physics.add.collider(this.fireGirl, this.ground);
        this.physics.add.collider(this.waterBoy, this.platform);
        this.physics.add.collider(this.waterBoy, this.purplePlatform);
        this.physics.add.collider(this.fireGirl, this.purplePlatform);
        this.physics.add.collider(this.fireGirl, this.platform);

        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('Scene1');
                    break;
                case '2':
                    this.scene.start('Scene2');
                    break;
                case 'r':
                    this.scene.start('Scene2');
                    break;
            }
        })
    }

    changeDoor(sprite, collidedObject) {
        collidedObject.setTexture('greenDoor');
        }
    changeButton(sprite, collidedObject) {
        collidedObject.setTexture('pressedButton');
        this.buttonPressed = true
        }    
    changePurpleButton(sprite, collidedObject) {
        collidedObject.setTexture('purplePressedButton');
        this.purpleButtonPressed = true
        }  


    update() {
        
        this.physics.add.overlap(this.waterBoy, this.blueDoor, this.changeDoor, null, this);
        this.physics.add.overlap(this.fireGirl, this.redDoor, this.changeDoor, null, this);
        this.physics.add.overlap(this.waterBoy, this.button, this.changeButton, null, this);
        this.physics.add.overlap(this.fireGirl, this.purpleButton, this.changePurpleButton, null, this);

        if (this.redDoor.texture.key === 'greenDoor' && this.blueDoor.texture.key === 'greenDoor') {
            this.scene.start('Transition2'); 
        }
        if(this.buttonPressed == true){
            this.platform.body.setVelocityY(-50);
        }
        if(this.purpleButtonPressed == true){
            this.purplePlatform.body.setVelocityY(-50);
        }

        // check keyboard input
        if (this.keys.A.isDown) {
            this.fireGirl.body.setAccelerationX(-this.ACCELERATION);
          } else if (this.keys.D.isDown) {
            this.fireGirl.body.setAccelerationX(this.ACCELERATION);
          }
          else{
            this.fireGirl.body.setAccelerationX(0);
            this.fireGirl.body.setDragX(999999);
          }

          if (this.fireGirl.body.touching.down && this.keys.W.isDown) {
            this.fireGirl.body.setVelocityY(this.JUMP_VELOCITY);
          } 
          




        if(this.keys.LEFT.isDown) {
            this.waterBoy.body.setAccelerationX(-this.ACCELERATION);
   

        } else if(this.keys.RIGHT.isDown) {
            this.waterBoy.body.setAccelerationX(this.ACCELERATION);
  

        } else{
            this.waterBoy.body.setAccelerationX(0);
            this.waterBoy.body.setDragX(999999);
        }


        if(!this.waterBoy.body.touching.down) {
            this.waterBoy.anims.play('jump', true);
        }

        if(this.waterBoy.body.touching.down && this.keys.UP.isDown) {
            this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);

        }

    
       
        
    }
}