

// Create 'main' state which contain game

var mainState = {

    preload: function(){
        // This function will be executed at the beginning     
        // That's where we load the game's assets 

        // Change the background color of the game 
        game.stage.backgroundColor = '#71c5cf';

        // Bacground img
        game.load.image('background', 'assets/mar.jpg');

        // Load the bird sprite
        game.load.image('bird', 'assets/barcoUp.png');
        game.load.image('birdDown', 'assets/barcoDown.png');

        // Load the pipes sprite
        game.load.image('pipe', 'assets/mitadfaro.png');

        // Load pipe top Up sprite 
        game.load.image('pipeUp', 'assets/faroUp.png');

        // Load pipe top Down Sprite
        game.load.image('pipeDown', 'assets/faroDown.png');

        game.load.image('nubeA', 'assets/nubeA.png');
        game.load.image('nubeB', 'assets/nubeB.png');
        game.load.image('nubeC', 'assets/nubeC.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  

        // Load Background

        this.background = this.game.add.sprite(0, 0, 'background');

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 220, 'bird');

        // Add gravity to the bird to make it fall
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // Jump function when space key is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        spaceKey.onUp.add(this.birdUp, this);
        game.input.onDown.add(this.jump, this);
        game.input.onUp.add(this.birdUp, this);

        //Create pipes
        this.pipes = game.add.group(); //Create a group
        this.pipes.enableBody = true; // Add physics to the group
        this.pipes.createMultiple(30, 'pipe'); //Create 20 pipes

        //Create pipe tops Up
        this.topUp = game.add.group();
        this.topUp.enableBody = true; 
        this.topUp.createMultiple(6, 'pipeUp');

        //Create pipe tops Down
        this.topDown = game.add.group();
        this.topDown.enableBody = true; 
        this.topDown.createMultiple(6, 'pipeDown'); 

        // Add the pipes
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        // Add scoring 
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

        // Load Clouds 

        this.cloud = game.add.group();
        this.cloud.enableBody = true;

        this.timer = game.time.events.loop(1500, this.addCloud, this);
           

    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic

        // If the bird is out of the world (too high or too low), call the 'restartGame' function
        if (this.bird.inWorld == false){
            this.restartGame();
        }

        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        game.physics.arcade.overlap(this.bird, this.topUp, this.restartGame, null, this);
        game.physics.arcade.overlap(this.bird, this.topDown, this.restartGame, null, this);

    },

    // Make the bird jump 
    jump: function() {  
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        this.bird.loadTexture('birdDown', 0);
    },

    birdUp: function() {
         this.bird.loadTexture('bird', 0);
    },

    // Restart the game
    restartGame: function() {  
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addOnePipe: function(x, y, top) {

        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();
        var pipeUp = this.topUp.getFirstDead();
        var pipeDown = this.topDown.getFirstDead();

        if (top === 'up'){

            pipeUp.reset(x, y);

            pipeUp.body.velocity.x = -200;

        }

        else if (top === 'down'){

            pipeDown.reset(x, y);

            pipeDown.body.velocity.x = -200;

        }

        else {

            // Set the new position of the pipe
            pipe.reset(x, y);

            // Add volocity to the pipe to move it to the left
            pipe.body.velocity.x = -200;

        } 

        // Kill pipe when no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
        // Kill pipe when no longer visible
        pipeUp.checkWorldBounds = true;
        pipeUp.outOfBoundsKill = true;
        // Kill pipe when no longer visible
        pipeDown.checkWorldBounds = true;
        pipeDown.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        // Pick where the hole will be
        var hole = Math.floor(Math.random() * 8) + 1;

        // Add the 6 pipes
        for (var i = 0; i < 11; i++) {
            if (i != hole && i != hole + 1) {
                if(i == hole - 1){
                    if(i <= 1){
                        this.addOnePipe(400, i * 60, 'down');
                    }
                    else{
                        this.addOnePipe(400, i * 60 + 10, 'down');
                    }
                }
                else if(i == hole + 2){
                    if(i >= 10 ){
                        this.addOnePipe(400, i * 60 - 17, 'up');
                    }
                    else{
                        this.addOnePipe(400, i * 60 + 15, 'up');
                    }
                }
                else{
                    this.addOnePipe(400, i * 60);    
                }
                
            };
        };

        // Count the score
        this.score +=1;
        this.labelScore.text = this.score;
    },

    addCloud: function() {
        var cloud = this.cloud;
        var nubes = ['nubeA', 'nubeB'];

        for (var i = 0; i < 2; i++) {

            cloud.create(360 + Math.random() * 200, 120 + Math.random() * 500, nubes[Math.floor(Math.random() * 2 )]).body.velocity.x = -200;
        };
        
    }

};

