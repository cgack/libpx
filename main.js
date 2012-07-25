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
        name: "fence",
        type: "image",
        src: "assets/fence.png"
    },
    {
        name: "dirt2",
        type: "image",
        src: "assets/dirt2.png"
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
    },
    {
        name: "magic_firelion_sheet",
        type: "image",
        src: "assets/magic/magic_firelion_sheet.png"
    },
    {
        name: "32x32_font",
        type: "image",
        src: "assets/32x32_font.png"
    },
    {
        name: "metatiles32x32",
        type: "image",
        src: "assets/metatiles32x32.png"
    },
    {
        name: "tileset01",
        type: "image",
        src: "assets/tileset01.png"
    },
    {
        name: "water",
        type: "image",
        src: "assets/water.png"
    },
    {
        name: "waterfall",
        type: "image",
        src: "assets/waterfall.png"
    },
    {
        name: "watergrass",
        type: "image",
        src: "assets/watergrass.png"
    },
    {
        name:"lpc_home_cup",
        type: "image",
        src: "assets/lpc_home_cup.png"
    }
    ];
 
var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('jsapp', 720/*window.innerWidth*/, 480 /*window.innerHeight*/, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }
        me.sys.useNativeAnimFrame = true;
        me.sys.fps = 30;
        //me.debug.renderHitBox = true;
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
        //MENU Screen
        me.game.PLAYER_IS_ALIVE = true;
        me.game.BAD_GUY_COUNT = 7;
        me.game.GAME_IS_WON = false;
        me.game.MESSAGE_IS_SHOWING = false;

        me.state.set(me.state.MENU, new MenuScreen());
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());


        me.state.set(me.state.LOSE, new MenuScreen());
        me.state.set(me.state.WIN, new MenuScreen());

// add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("EnemyEntity", EnemyEntity);
        me.entityPool.add("MagicEntity", MagicEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.O, "fire");
        me.input.bindKey(me.input.KEY.X, "mouseOverride");
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);

        // start the game
        me.state.change(me.state.MENU);
    }
 
};
// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // stuff to reset on state change
        me.levelDirector.loadLevel("test1");
         // add a default HUD to the game mngr (with no background)
        if (!me.game.HUD) {
            me.game.addHUD(0,0,720,480);
            // add the "score" HUD item
            me.game.HUD.addItem("score", new ScoreObject(500,30));
            me.game.HUD.addItem("health", new ScoreObject(20, 30));
            me.game.HUD.addItem("message", new MessageObject(340,400));
        }
        me.game.HUD.setItemValue("health", 100);
        me.game.HUD.setItemValue("score", 0);
        me.game.HUD.setItemValue("message", "");
    },
 
    /* ---
 
     action to perform when game is finished (state change)
 
     --- */
    onDestroyEvent: function() {
    }
 
});

var MenuScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.font = new me.Font("Helvetica", 48, "white", "center");


    },
    onResetEvent: function() {
        if (this.title === null) {
            this.title = me.loader.getImage("lpc_home_cup");
        }
        me.input.bindKey(me.input.KEY.ENTER,"enter",true);
    },
    update: function() {
        if (me.input.isKeyPressed("enter")) {
            me.game.PLAYER_IS_ALIVE = true;
            me.state.change(me.state.PLAY);
        }
        return true;
    },
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        if (!me.game.PLAYER_IS_ALIVE) {
            this.font.draw(context, "You Lost!", 200, 300);
        } else if (me.game.GAME_IS_WON) {
            this.font.draw(context, "YOU WON!!", 200, 300);
        }
        this.font.draw(context, "PRESS ENTER TO PLAY", 80, 400);
    },
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});

var ScoreObject = me.HUD_Item.extend({
   init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        //this.font = new me.BitmapFont("32x32_font", 32);
        this.font = new me.Font("Helvetica", 32, "white", "left");
    },
 
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

var MessageObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x,y);
        this.font = new me.Font("Helvetica", 24, "lightgrey", "left");
    },

    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

/***
MAIN PLAYER
***/
var PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        this.parent(x,y,settings);

        this.updateColRect(8,48,10,54);
        this.setVelocity(0,0);
        this.setFriction(0.22, 0.22);
        this.gravity = 0;
        this.direction = "south";
        this.health = 100;
        
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

        this.type = me.game.PLAYER_MAIN;

    },
    checkRemoveMessage: function() {
        if (me.game.MESSAGE_IS_SHOWING) {
            me.game.HUD.updateItemValue("message", "");
        }
    },
    update: function() {
        this.handleInput();
        this.updateMovement();

        var res = me.game.collide(this);

        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                    this.flicker(45);
                    if (this.isFiring) {
                        me.game.HUD.updateItemValue("score", 25);
                    } else {
                        me.game.HUD.updateItemValue("health", -1);
                        this.health = this.health  - 1;
                        if (this.health === 0) {
                            me.game.PLAYER_IS_ALIVE = false;
                            me.state.change(me.game.LOSE);
                        }
                    }
            }
        }
 
        if (this.vel.x!==0 || this.vel.y !== 0 || this.isFiring) {
            this.parent(this);
            return true;
        }
        return false;
    },
    isFiring: false,
    handleInput: function() {

        if (me.input.isKeyPressed('fire')) {
            this.checkRemoveMessage();
            this.isFiring = true;
            this.setVelocity(0,0);
            
            if (this.direction === "west") {
                magic = new MagicEntity(this.pos.x - 42, this.pos.y + 42, {});
                magic.flipX(true);
            } else if (this.direction === "east") {
                magic = new MagicEntity(this.pos.x + 42, this.pos.y + 42, {});
            }
            me.game.add(magic, this.z);
            me.game.sort();
        } else {
            this.isFiring = false;
            this.setVelocity(2,2);
        }
        var currentAnimation = "";
       /* only keyboard for now
        if (me.input.isKeyPressed("mouseOverride")) {
            this.checkRemoveMessage();
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
        } */

        if (me.input.isKeyPressed('left'))
        {
            this.checkRemoveMessage();
            this.vel.x -= this.accel.x * me.timer.tick;
            this.direction = 'west';
        }
        else if (me.input.isKeyPressed('right'))
        {
            this.checkRemoveMessage();
            this.vel.x += this.accel.x * me.timer.tick;
            this.direction = 'east';
        }
        if (me.input.isKeyPressed('up'))
        {
            this.checkRemoveMessage();
            this.vel.y = -this.accel.y * me.timer.tick;
            this.direction = 'north';
        }
        else if (me.input.isKeyPressed('down'))
        {
            this.checkRemoveMessage();
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

var MagicEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "magic_firelion_sheet";
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x,y,settings);

        this.gravity = 0;
        //this.setVelocity(3,0);
        //this.vel.x = 0.1;
        this.collidable = true;

        this.addAnimation("fire", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

        this.type = me.game.MAGIC_OBJECT;

    },
    update: function() {

        this.setCurrentAnimation("fire", function() { me.game.remove(this);});

        this.updateMovement();
            this.parent(this);
            return true;
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
        this.startY = y;

        this.health = 100;

        this.endY = y + settings.height - settings.spriteheight;
        this.endX = x + settings.width - settings.spritewidth;

        this.pos.x = x + settings.width - settings.spritewidth;
        this.setCurrentAnimation("east");
        this.collidable = true;


        this.type = me.game.ENEMY_OBJECT;

    },
    onCollision: function(res, obj) {
        //we should do something here
        me.game.MESSAGE_IS_SHOWING = true;
        me.game.HUD.updateItemValue("message", "EHEU!");
    },
    update: function() {
        
        if (this.pos.x <= this.startX) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.setCurrentAnimation("east");
        } else if (this.pos.x >= this.endX) {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.setCurrentAnimation("west");
        } else if (this.pos.y >= this.endY) {
            this.vel.y -= this.accel.y * me.timer.tick;
            this.setCurrentAnimation("north");
        } else if (this.pos.y <= this.startY) {
            this.vel.y += this.accel.y * me.timer.tick;
            this.setCurrentAnimation("south");
        }

        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.MAGIC_OBJECT) {
                me.game.HUD.updateItemValue("score", 25);
                this.health = this.health - 2;
                if (this.health === 0) {
                    me.game.remove(this);
                    me.game.BAD_GUY_COUNT--;
                    if (me.game.BAD_GUY_COUNT === 0) {
                        me.game.GAME_IS_WON = true;
                        me.state.change(me.game.WIN);
                    }
                }
            }
        }
 

        this.updateMovement();

        this.parent(this);
        return true;
    }
});

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});