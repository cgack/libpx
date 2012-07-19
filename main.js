// game resources
var g_resources = [
    {
        name: "lava",
        type: "image",
        src: "assets/lava.png"
    },
    {
        name: "lavarock",
        type: "image",
        src: "assets/lavarock.png"
    },
    {
        name: "grass",
        type: "image",
        src: "assets/grass.png"
    },
    {
        name: "test1",
        type: "tmx",
        src: "test1.tmx"
    },
    {
        name: "gray_mage",
        type: "image",
        src: "assets/gray_mage.png"
    },
    {
        name: "malesoldierzombie",
        type: "image",
        src: "assets/malesoldierzombie.png"
    },
    {
        name: "house",
        type: "image",
        src: "assets/house.png"
    }

    ];
 
var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('jsapp', 640/*window.innerWidth*/, 480 /*window.innerHeight*/, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }
        me.sys.useNativeAnimFrame = true;
        me.sys.fps = 30;
        //me.debug.renderHitBox = true;

        // add a default HUD to the game mngr (with no background)
        //me.game.addHUD(0,0,480,100);
        // add the "score" HUD item
        //me.game.HUD.addItem("score", new ScoreObject(470,10));
        // initialize the "audio"
        me.audio.init("mp3,ogg");
 
        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);
 
        // set all resources to be loaded
        me.loader.preload(g_resources);
 
        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },
 
    /* ---
 
     callback when everything is loaded
 
     --- */
    loaded: function() {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
 
// add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("EnemyEntity", EnemyEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "fire");
        me.input.bindKey(me.input.KEY.X, "mouseOverride");
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);

        // start the game
        me.state.change(me.state.PLAY);
    }
 
};
// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // stuff to reset on state change
        me.levelDirector.loadLevel("test1");
    },
 
    /* ---
 
     action to perform when game is finished (state change)
 
     --- */
    onDestroyEvent: function() {
    }
 
});

/*player*/
var PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        this.parent(x,y,settings);

        this.updateColRect(8,48,10,54);
//defaults
        this.setVelocity(1.5,1.5);
        this.setFriction(0.1, 0.1);
        this.gravity = 0;
        this.direction = "south";
        
        this.addAnimation("stand-n", [0]);
        this.addAnimation("stand-s", [18]);
        this.addAnimation("stand-e", [27]);
        this.addAnimation("stand-w", [9]);

        this.addAnimation("north", [1,2,3,4,5,6,7,8]);
        this.addAnimation("west", [10,11,12,13,14,15,16,17]);
        this.addAnimation("south", [19,20,21,22,23,24,25,26]);
        this.addAnimation("east", [28,29,30,31,32,33,34,35]);

        this.addAnimation("fire-n", [72,73,74,75,76,77]);
        this.addAnimation("fire-w", [81,82,83,84,85,86]);
        this.addAnimation("fire-s", [90,91,92,93,94,95]);
        this.addAnimation("fire-e", [99,100,101,102,103,104]);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
 
        this.handleInput();

        this.updateMovement();

           // check for collision
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                    this.flicker(45);
            }
        }
 
        // update animation if necessary
        if (this.vel.x!==0 || this.vel.y !== 0 || this.isFiring) {
            // update objet animation
            this.parent(this);
            return true;
        }
        return false;
    },
    isFiring: false,
    handleInput: function() {

        if (me.input.isKeyPressed('fire')) {
            this.isFiring = true;
            this.setVelocity(0,0);
        } else {
            this.isFiring = false;
            this.setVelocity(3,3);
        }
        var currentAnimation = "";
        
        if (me.input.isKeyPressed("mouseOverride")) {
            
            if (this.collisionBox.left > me.input.mouse.pos.x) {
                this.vel.x -= this.accel.x * me.timer.tick * 4;
                this.direction = "west";
            } else if (this.collisionBox.right < me.input.mouse.pos.x) {
                 this.vel.x += this.accel.x * me.timer.tick;
                this.direction = 'east';
            } else if (this.collisionBox.top > me.input.mouse.pos.y) {
                this.vel.y = -this.accel.y * me.timer.tick;
                this.direction = 'north';
            } else if (this.collisionBox.bottom < me.input.mouse.pos.y) {
                this.vel.y = this.accel.y * me.timer.tick;
                this.direction = 'south';
            }
        }

        if (me.input.isKeyPressed('left'))
        {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.direction = 'west';
        }
        else if (me.input.isKeyPressed('right'))
        {
            this.vel.x += this.accel.x * me.timer.tick;
            this.direction = 'east';
        }
        if (me.input.isKeyPressed('up'))
        {
            this.vel.y = -this.accel.y * me.timer.tick;
            this.direction = 'north';
        }
        else if (me.input.isKeyPressed('down'))
        {
            this.vel.y = this.accel.y * me.timer.tick;
            this.direction = 'south';
        }

        switch (this.direction) {
            case "west":
                currentAnimation = this.isFiring ? "fire-w" : "west";
                break;
            case "east":
                currentAnimation = this.isFiring ? "fire-e" : "east";
                break;
            case "north":
                currentAnimation = this.isFiring ? "fire-n" : "north";
                break;
            case "south":
                currentAnimation = this.isFiring ? "fire-s" : "south";
                break;
        }


        if ( currentAnimation !== "" ) {

            this.setCurrentAnimation(currentAnimation);
        }
    }


    
});


var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "malesoldierzombie";
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);
        
        this.updateColRect(8,48,10,54);

        this.gravity = 0;
        this.setVelocity(0.5,1);

        this.addAnimation("stand-n", [0]);
        this.addAnimation("stand-s", [18]);
        this.addAnimation("stand-e", [27]);
        this.addAnimation("stand-w", [9]);

        this.addAnimation("north", [1,2,3,4,5,6,7,8]);
        this.addAnimation("west", [10,11,12,13,14,15,16,17]);
        this.addAnimation("south", [19,20,21,22,23,24,25,26]);
        this.addAnimation("east", [28,29,30,31,32,33,34,35]);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;

        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        this.collidable = true;

//        var res = me.game.collide(res)

        this.type = me.game.ENEMY_OBJECT;

    },
    onCollision: function(res, obj) {
        //we should do something here
    },
    update: function() {
        this.setCurrentAnimation("east");
        if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
        } else if (!this.walkLeft && this.pos.x >= this.endX) {
            this.walkLeft = true;
        }
        this.doWalk(this.walkLeft);

        this.updateMovement();

        if (this.vel.x !== 0 || this.vel.y !== 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});