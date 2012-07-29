// game resources
var g_resources = [
    /* maps */
    {   name: "area0",        type: "tmx",        src: "area0.tmx"    },
    {   name: "area0_e",        type: "tmx",        src: "area0_e.tmx"    },
    {   name: "area_east",     type: "tmx",        src: "area_east.tmx"},
    {   name: "area_west", type: "tmx", src: "area_west.tmx" },
    {   name: "area0_w", type: "tmx", src: "area0_w.tmx"},
    {   name: "area_south", type:"tmx", src: "area_south.tmx" },
    {   name: "area0_s", type: "tmx", src: "area0_s.tmx" },
    {   name: "area_north", type: "tmx", src: "area_north.tmx" },
    {   name: "area0_n", type: "tmx", src: "area0_n.tmx" },
    {   name: "inside",     type: "tmx", src: "inside.tmx" },
    {   name: "area0_farm", type: "tmx", src: "area0_farm.tmx"},
    /* characters */
    {   name: "gray_mage", type: "image",        src: "assets/gray_mage.png"    },
    {   name: "forest_mage",   type: "image", src: "assets/forest_mage.png" },
    {   name: "dark_mage_elder", type: "image", src: "assets/dark_mage_elder.png"},
    {   name: "royal_mage", type: "image", src: "assets/royal_mage.png"},
    {   name: "red_novice", type: "image", src: "assets/red_novice.png"},
    {   name: "malesoldierzombie",        type: "image",        src: "assets/malesoldierzombie.png"    },
    {   name: "bat", type: "image", src: "assets/bat.png"},
    /* other assets */
    {   name: "house",        type: "image",        src: "assets/house.png"    },
    {   name: "magic_firelion_sheet",        type: "image",        src: "assets/magic/magic_firelion_sheet.png"    },
    {   name: "magic_torrentacle", type: "image", src: "assets/magic/magic_torrentacle.png" },
    {   name: "magic_iceshield_sheet", type: "image", src: "assets/magic/magic_iceshield_sheet.png"},
    {   name: "32x32_font",        type: "image",        src: "assets/32x32_font.png"    },
    {   name: "metatiles32x32",        type: "image",        src: "assets/metatiles32x32.png"    },
    {   name: "tileset01",        type: "image",        src: "assets/tileset01.png"    },
    {   name: "water",        type: "image",        src: "assets/water.png"    },
    {   name: "waterfall",        type: "image",        src: "assets/waterfall.png"    },
    {   name: "watergrass",        type: "image",        src: "assets/watergrass.png"    },
    {   name:"lpc_home_cup",        type: "image",        src: "assets/lpc_home_cup.png"    },
    {   name: "inside", type:"image", src: "assets/inside.png"},
    {   name: "barrel", type: "image", src: "assets/barrel.png"},
    {   name: "cabinets", type: "image", src:"assets/cabinets.png" },
    {   name: "country", type: "image", src: "assets/country.png" },
    {   name: "cup", type: "image", src: "assets/cup.png"},
    {   name: "treetop", type: "image", src: "assets/treetop.png" },
    {   name: "trunk", type: "image", src: "assets/trunk.png" },
    {   name: "lava",        type: "image",        src: "assets/lava.png"    },
    {   name: "lavarock",        type: "image",        src: "assets/lavarock.png"    },
    {   name: "grass",       type: "image",        src: "assets/grass.png"    },
    {   name: "fence",        type: "image",        src: "assets/fence.png"    },
    {   name: "dirt",   type: "image", src: "assets/dirt.png" },
    {   name: "hole", type: "image", src: "assets/hole.png" },
    {   name: "dirt2",        type: "image",        src: "assets/dirt2.png"    }
    

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
       // me.state.change(me.state.LOADING);
    },
 
    /* ---
 
     callback when everything is loaded
 
     --- */
    loaded: function() {
        me.game.STATE = {
            playerIsAlive: true,
            badGuyCount: 70,
            gameIsWon: false,
            messageIsShowing: false,
            weaponState: null,
            cupKnowledge: false
        };
        me.state.set(me.state.MENU, new MenuScreen());
        me.state.set(me.state.PLAY, new PlayScreen());


        me.state.set(me.state.LOSE, new MenuScreen());
        me.state.set(me.state.WIN, new MenuScreen());

        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("friendlyForestMage", FriendEntity);
        me.entityPool.add("friendFireMage", FireMage);
        me.entityPool.add("friendRoyalMage", RoyalMage);
        me.entityPool.add("friendRedNovice", RedNovice);
        me.entityPool.add("lpc", lpc);
        me.entityPool.add("EnemyEntity", EnemyEntity);
        me.entityPool.add("FlyingEnemy", FlyingEnemy);
        me.entityPool.add("MagicEntity", MagicEntity);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "fire");
        me.input.bindKey(me.input.KEY.X, "mouseOverride");
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);

        me.state.change(me.state.MENU);
    }
 
};
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        me.levelDirector.loadLevel("area0");
        if (!me.game.HUD) {
            me.game.addHUD(0,0,720,480);
            me.game.HUD.addItem("score", new ScoreObject(600,30));
            me.game.HUD.addItem("scorelbl", new ScoreObject(500, 30));
            me.game.HUD.addItem("health", new ScoreObject(100, 30));
            me.game.HUD.addItem("healthlbl", new ScoreObject(1, 30));
            me.game.HUD.addItem("message", new MessageObject(20,400));
        }
        me.game.HUD.setItemValue("healthlbl", "health:");
        me.game.HUD.setItemValue("health", 100);
        me.game.HUD.setItemValue("scorelbl", "score:");
        me.game.HUD.setItemValue("score", 0);
        me.game.HUD.setItemValue("message", "");
    },
 
    onDestroyEvent: function() {
    }
 
});

var MenuScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.font = new me.Font("Helvetica", 48, "white", "center");
        this.fontsmall = new me.Font("Helvetica", 24, "white", "center");
        this.fontxsm = new me.Font("Helvetica", 12, "lightgrey","center");
        this.scroller =  "use the arrow keys to move";
        this.scrollerpos = 700;
    },
    onResetEvent: function() {
        if (this.title === null) {
            this.title = me.loader.getImage("lpc_home_cup");
        }
        this.scrollerpos = 720;
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 5e4).onComplete(this.scrollover.bind(this)).start();
        me.input.bindKey(me.input.KEY.ENTER,"enter",true);
    },
     scrollover: function() {
        this.scrollerpos = 720;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
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
        if (!me.game.STATE.playerIsAlive) {
            this.font.draw(context, "You Just Lost The Game!", 100, 300);
        } else if (me.game.STATE.gameIsWon) {
            this.font.draw(context, "YOU WON!!", 200, 300);
            this.game.HUD.updateItemValue("message", "");
        }
        this.font.draw(context, "Pixel Quest", 235 ,225);
        this.fontxsm.draw(context, "a Liberated Pixel Cup Game", 450, 250);
        this.fontsmall.draw(context, "PRESS ENTER TO PLAY", 225, 400);
        this.fontxsm.draw(context, this.scroller, 285,425);
        //this.fontsmall.draw(context, this.scroller, this.scrollerpos, 450);
    },
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        this.scrollertween.stop();
    }
});

var ScoreObject = me.HUD_Item.extend({
   init: function(x, y) {
        this.parent(x, y);
        this.font = new me.Font("Helvetica", 32, "white", "left");
    },
 
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

var MessageObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x,y);
        this.font = new me.Font("Helvetica", 20, "lightgrey", "left");
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

        this.updateColRect(16,32,10,54);
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
        if (me.game.STATE.messageIsShowing) {
            me.game.HUD.updateItemValue("message", "");
        }

    },
    update: function() {
         if (this.health === 0) {
            me.game.STATE.playerIsAlive = false;
            me.state.change(me.game.LOSE);
        }
        this.handleInput();
        this.updateMovement();

        var res = me.game.collide(this);

        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                    if (this.isFiring) {
                        me.game.HUD.updateItemValue("score", this.weaponState ? 25 : 8);
                    }
                    if (!this.flickering) {

                        me.game.HUD.updateItemValue("health", - 10);
                        this.health = this.health  - 10;
                        if (this.health === 0) {
                            me.game.STATE.playerIsAlive = false;
                            me.state.change(me.game.LOSE);
                        }
                    }
                    this.flicker(15);
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
            if (me.game.STATE.weaponState === "firelion") {
                if (this.direction === "west") {
                    magic = new MagicEntity(this.pos.x - 42, this.pos.y + 42, { image: "magic_firelion_sheet", spritewidth: 64, spriteheight: 64 });
                    magic.flipX(true);
                    me.game.add(magic, this.z);
                    me.game.sort();
                } else if (this.direction === "east") {
                    magic = new MagicEntity(this.pos.x + 42, this.pos.y + 42, { image: "magic_firelion_sheet", spriteheight: 64, spritewidth: 64});
                    me.game.add(magic, this.z);
                    me.game.sort();
                } else {
                    magic = new MagicEntity(this.pos.x - 24 , this.pos.y + 64, { image: "magic_iceshield_sheet", spriteheight: 128, spritewidth: 128 } );
                    me.game.add(magic, this.z);
                    me.game.sort();
                }
            }

            if (me.game.STATE.weaponState === "magic_torrentacle") {
                if (this.direction === "west") {
                    magic = new MagicEntity(this.pos.x - 100, this.pos.y + 30 , { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128});
                    magic.flipX(true);
                    me.game.add(magic, this.z);
                    me.game.sort();
                } else if (this.direction === "east") {
                    magic = new MagicEntity(this.pos.x + 42, this.pos.y + 30, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
                    me.game.add(magic, this.z);
                    me.game.sort();
                } else if (this.direction === "south") {
                    magic = new MagicEntity(this.pos.x - 24 , this.pos.y + 100, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
                    me.game.add(magic, this.z);
                    me.game.sort();
                } else if (this.direction === "north" ) {
                    magic = new MagicEntity(this.pos.x - 24, this.pos.y - 30, { image: "magic_torrentacle", spriteheight: 128, spritewidth: 128 });
                    me.game.add(magic, this.z);
                    me.game.sort();
                }
            }

        } else {
            this.isFiring = false;
            this.setVelocity(2,2);
        }
        var currentAnimation = "";

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
        
        this.parent(x,y,settings);

        this.gravity = 0;
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

var lpc = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.spritewidth = 32;
        settings.spriteheight = 64;
        this.parent(x, y, settings);
        this.gravity = 0;
        this.setVelocity(0,0);
        this.collidable = true;

        this.type = me.game.LPC;
    },
    onCollision: function(res, obj) {
        if (obj.type === me.game.PLAYER_MAIN) {
            if (me.game.STATE.cupKnowledge) {
                me.game.STATE.messageIsShowing = true;
                me.game.HUD.updateItemValue("message", "You have found the Liberated Pixel Cup!");
                me.game.STATE.gameIsWon = true;
                me.state.change(me.game.WIN);
            } else {
                me.game.STATE.messageIsShowing = true;
                me.game.HUD.updateItemValue("message", "What a strange place for a cup?");
            }
        }
    }
});

var FireMage = me.ObjectEntity.extend({
   init: function(x, y, settings) {
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);

        this.updateColRect(8,48,10,54);

        this.gravity = 0;
        this.setVelocity(0,0);
        this.collidable = true;

        this.addAnimation("stand-s", [18]);

        this.type = me.game.FRIEND_OBJECT;
    },
    onCollision: function(res, obj) {
        if (obj.type === me.game.PLAYER_MAIN) {
            me.game.STATE.messageIsShowing = true;
            me.game.HUD.updateItemValue("message", "Moashiin, for your troubles, the powers of fire and ice." );
            me.game.STATE["weaponState"] = "firelion";
        }

    },
    update: function() {
        this.setCurrentAnimation("stand-s");

        return true;
    }
});

var RoyalMage = me.ObjectEntity.extend({
   init: function(x, y, settings) {
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);

        this.updateColRect(8,48,10,54);

        this.gravity = 0;
        this.setVelocity(0,0);
        this.collidable = true;

        this.addAnimation("stand-s", [18]);

        this.type = me.game.FRIEND_OBJECT;
    },
    onCollision: function(res, obj) {
        if (obj.type === me.game.PLAYER_MAIN) {
            me.game.STATE.messageIsShowing = true;
            me.game.HUD.updateItemValue("message", "Moashiin, to save the world you'll need to find the cup." );
            me.game.STATE["cupKnowledge"] = "true";
        }

    },
    update: function() {
        this.setCurrentAnimation("stand-s");

        return true;
    }
});


var FriendEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        //settings.image = "forest_mage";
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);

        this.updateColRect(8,48,10,54);

        this.gravity = 0;
        this.setVelocity(0,0);
        this.collidable = true;

        this.addAnimation("stand-s", [18]);

        this.type = me.game.FRIEND_OBJECT;
    },
    onCollision: function(res, obj) {
        if (obj.type === me.game.PLAYER_MAIN) {
            me.game.STATE.messageIsShowing = true;
            me.game.HUD.updateItemValue("message","Moashiin, there are enemies around, defend yourself with spacebar" );
            me.game.STATE["weaponState"] = "magic_torrentacle";
        }

    },
    update: function() {
        this.setCurrentAnimation("stand-s");

        return true;
    }
});

var RedNovice = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        //settings.image = "forest_mage";
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);

        this.updateColRect(8,48,10,54);

        this.gravity = 0;
        this.setVelocity(0,0);
        this.collidable = true;

        this.addAnimation("stand-s", [18]);

        this.type = me.game.FRIEND_OBJECT;
    },
    onCollision: function(res, obj) {
        if (obj.type === me.game.PLAYER_MAIN) {
            me.game.STATE.messageIsShowing = true;
            me.game.HUD.updateItemValue("message","Moashiin, use this magic to help against enemies." );
            me.game.STATE["weaponState"] = "magic_torrentacle";
        }

    },
    update: function() {
        this.setCurrentAnimation("stand-s");

        return true;
    }
});
var FlyingEnemy = me.ObjectEntity.extend( {
  init: function(x, y, settings) {
        settings.image = "bat";
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        this.parent(x, y, settings);
        
        //this.updateColRect(16,32,10,54);

        this.gravity = 0;
        this.setVelocity(0.5,1);

        this.addAnimation("stand-n", [0]);
        this.addAnimation("stand-s", [6]);
        this.addAnimation("stand-e", [9]);
        this.addAnimation("stand-w", [3]);

        this.addAnimation("north", [0,1,2]);
        this.addAnimation("west", [3,4,5]);
        this.addAnimation("south", [6,7,8]);
        this.addAnimation("east", [9,10,11]);

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
        if (me.game.getEntityByName("mainPlayer")[0].isFiring && obj.type == me.game.PLAYER_MAIN) {
            me.game.HUD.updateItemValue("score", 5);
            var damage = me.game.STATE.weaponState === "firelion" ? 2 : 0.5;
            this.health = this.health - damage;
            if (this.health === 0) {
                me.game.remove(this);
                me.game.STATE.badGuyCount--;
                if (me.game.STATE.badGuyCount === 0) {
                    me.game.STATE.gameIsWon = true;
                    me.state.change(me.game.WIN);
                }
            }
        }
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
            if (res.obj.type == me.game.MAGIC_OBJECT) {
                me.game.HUD.updateItemValue("score", 25);
                this.health = this.health - 2;
                if (this.health === 0) {
                    me.game.remove(this);
                    me.game.STATE.badGuyCount--;
                    if (me.game.STATE.badGuyCount === 0) {
                        me.game.STATE.gameIsWon = true;
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
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "malesoldierzombie";
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        this.parent(x, y, settings);
        
        this.updateColRect(16,32,10,54);

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
        if (me.game.getEntityByName("mainPlayer")[0].isFiring && obj.type == me.game.PLAYER_MAIN) {
            me.game.HUD.updateItemValue("score", 5);
            var damage = me.game.STATE.weaponState === "firelion" ? 2 : 0.5;
            this.health = this.health - damage;
            if (this.health === 0) {
                me.game.remove(this);
                me.game.STATE.badGuyCount--;
                if (me.game.STATE.badGuyCount === 0) {
                    me.game.STATE.gameIsWon = true;
                    me.state.change(me.game.WIN);
                }
            }
        }
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
            if (res.obj.type == me.game.MAGIC_OBJECT) {
                me.game.HUD.updateItemValue("score", 25);
                this.health = this.health - 2;
                if (this.health === 0) {
                    me.game.remove(this);
                    me.game.STATE.badGuyCount--;
                    if (me.game.STATE.badGuyCount === 0) {
                        me.game.STATE.gameIsWon = true;
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

window.onReady(function() {
    jsApp.onload();
});