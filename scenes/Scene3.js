class Scene3 extends Phaser.Scene {
    constructor() {
        super('Scene3');
    }
    waterBoy;

    redButtonPressed = false;
    blueButtonPressed = false;

    create() {
        // variables and settings

        this.keys = this.input.keyboard.addKeys("W,A,S,D,UP,LEFT, RIGHT");
        this.ACCELERATION = 999999;
        this.MAX_X_VEL = 250;   // pixels/second
        this.MAX_Y_VEL = 5000;
     
        this.JUMP_VELOCITY = -950;
        this.physics.world.gravity.y = 3000;



        // print Scene name
        this.add.text(game.config.width/2, 30, 'Level3', { font: '14px Futura', fill: '#FFFFFF' }).setOrigin(0.5);
        
    

        // make ground tiles group
        this.ground = this.add.group();
        // Ground Floor
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        

        // Middle Walls
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
        
        
        // Middle Platform
        for(let i = tileSize*4; i < game.config.width-tileSize*4; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*6, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Upper Left Platfoorm
        for(let i = tileSize; i < game.config.width-tileSize*15; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Upper Right Platform
        for(let i = game.config.width-tileSize*2; i > game.config.width-tileSize*10; i -= tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;   
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        let groundTile = this.physics.add.sprite(game.config.width - tileSize, game.config.height - tileSize*2, 'groundTile').setScale(SCALE).setOrigin(0);
        groundTile.body.immovable = true;
        groundTile.body.allowGravity = false;

        let groundTile2 = this.physics.add.sprite(1, game.config.height - tileSize*2, 'groundTile').setScale(SCALE).setOrigin(0);
        groundTile2.body.immovable = true;
        groundTile2.body.allowGravity = false;
        this.ground.add(groundTile);
        this.ground.add(groundTile2);
        // set up doors
        this.redDoor = this.physics.add.sprite(game.config.width/2 + tileSize*2 , game.config.height - tileSize*3 + 6, 'redDoor').setScale(SCALE).setOrigin(0);
        this.redDoor.body.allowGravity = false;
        this.redDoor.body.onOverlap = true;
        this.blueDoor = this.physics.add.sprite(game.config.width/2 - tileSize*3 , game.config.height - tileSize*3 + 6, 'blueDoor').setScale(SCALE).setOrigin(0);
        this.blueDoor.body.allowGravity = false;
        this.blueDoor.body.immovable = true;

        // set up Gates

        this.redGate = this.physics.add.sprite(game.config.width/2 - tileSize*5 , game.config.height - tileSize*5 + 3 , 'redGate').setScale(SCALE).setOrigin(0);
        this.redGate.body.allowGravity = false;
        this.redGate.body.immovable= true;
        this.blueGate = this.physics.add.sprite(game.config.width/2 + tileSize*4 , game.config.height - tileSize*5 + 3 , 'blueGate').setScale(SCALE).setOrigin(0);
        this.blueGate.body.allowGravity = false;
        this.blueGate.body.immovable= true;
        this.outerRedGate = this.physics.add.sprite(game.config.width/2 + tileSize*6 , game.config.height - tileSize*5 + 3, 'redGate').setScale(SCALE).setOrigin(0);
        this.outerRedGate.body.allowGravity = false;
        this.outerRedGate.body.immovable= true;
        this.outerBlueGate = this.physics.add.sprite(game.config.width/2 - tileSize*7 , game.config.height - tileSize*5 + 3, 'blueGate').setScale(SCALE).setOrigin(0);
        this.outerBlueGate.body.allowGravity = false;
        this.outerBlueGate.body.immovable= true;
                

        // set up buttons 

        this.blueButton = this.physics.add.sprite(game.config.width/2 - tileSize*8 , game.config.height - tileSize*10 , 'blueButton').setScale(SCALE).setOrigin(0);
        this.blueButton.body.allowGravity = false;
        this.blueButton.body.immovable = true;
        this.redButton = this.physics.add.sprite(game.config.width/2 + tileSize*7 , game.config.height - tileSize*10 , 'redButton').setScale(SCALE).setOrigin(0);
        this.redButton.body.allowGravity = false;
        this.redButton.body.immovable = true;
                                                                           

        // set up Main Characters 
        this.waterBoy = this.physics.add.sprite(tileSize*4, game.config.height - tileSize*2, 'waterBoy').setScale(SCALE);
        this.waterBoy.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.waterBoy.setCollideWorldBounds(true);
        this.fireGirl = this.physics.add.sprite(game.config.width - tileSize*4, game.config.height - tileSize*2, 'fireGirl').setScale(SCALE);
        this.fireGirl.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.fireGirl.setCollideWorldBounds(true);

        

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.waterBoy, this.ground);
        this.physics.add.collider(this.fireGirl, this.ground);
        this.physics.add.collider(this.fireGirl, this.blueGate);
        this.physics.add.collider(this.waterBoy, this.redGate);

        //Debug: Scene Switcher
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

    changeSprite(waterBoy, collidedObject) {
        collidedObject.setTexture('greenDoor');
        }

    changeBlueButton(sprite, collidedObject) {
        collidedObject.setTexture('bluePressedButton');
        this.blueButtonPressed = true
        }    
    changeRedButton(sprite, collidedObject) {
        collidedObject.setTexture('redPressedButton');
        this.redButtonPressed = true
        }  

    update() {
        
        this.physics.add.overlap(this.waterBoy, this.blueDoor, this.changeSprite, null, this);
        this.physics.add.overlap(this.fireGirl, this.redDoor, this.changeSprite, null, this);
        this.physics.add.overlap(this.waterBoy, this.blueButton, this.changeBlueButton, null, this);
        this.physics.add.overlap(this.fireGirl, this.redButton, this.changeRedButton, null, this);


        if (this.redDoor.texture.key === 'greenDoor' && this.blueDoor.texture.key === 'greenDoor') {
            this.scene.start('Ending'); 
        }

        if(this.blueButtonPressed == true){
            this.blueGate.body.setVelocityY(100);
        }
        if(this.redButtonPressed == true){
            this.redGate.body.setVelocityY(100);
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

        if(this.waterBoy.body.touching.down && this.keys.UP.isDown) {
            this.waterBoy.body.setVelocityY(this.JUMP_VELOCITY);

        }

    
       
        
    }
}