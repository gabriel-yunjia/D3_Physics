class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }

    create() {
        // variables and settings

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
        this.add.text(game.config.width/2, 30, 'Level1', { font: '14px Futura', fill: '#FFFFFF' }).setOrigin(0.5);
        
    

        // make ground tiles group
        this.ground = this.add.group();
        // Ground Floor
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Middle Platform
        for(let i = tileSize*5; i < game.config.width-tileSize*4; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*5, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Red Door Platfoorm
        for(let i = tileSize; i < game.config.width-tileSize*15; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // Blue Door Platform
        for(let i = game.config.width-tileSize*2; i > game.config.width-tileSize*10; i -= tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize*9,  'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;   
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // set up doors
        this.redDoor = this.physics.add.sprite(tileSize*3, tileSize*4 + 6, 'redDoor').setScale(SCALE).setOrigin(0);
        this.redDoor.body.allowGravity = false;
        this.redDoor.body.immovable = true;

        this.blueDoor = this.physics.add.sprite(tileSize*21, tileSize*4 + 6, 'blueDoor').setScale(SCALE).setOrigin(0);
        this.blueDoor.body.allowGravity = false;
        this.blueDoor.body.immovable = true;


        // set up Main Characters 
        this.waterBoy = this.physics.add.sprite(game.config.width/4, game.config.height/2, 'waterBoy').setScale(SCALE);
        this.waterBoy.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.waterBoy.setCollideWorldBounds(true);
        this.fireGirl = this.physics.add.sprite(game.config.width/8, game.config.height/2, 'fireGirl').setScale(SCALE);
        this.fireGirl.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.fireGirl.setCollideWorldBounds(true);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.waterBoy, this.ground);
        this.physics.add.collider(this.fireGirl, this.ground);
       
    }

    update() {
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