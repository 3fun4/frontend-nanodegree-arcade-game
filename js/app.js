/**
 *
 *
 */

var X = 101;
var Y = 83;

var PLAYER_START_POS_X = 202.5;
var PLAYER_START_POS_Y = 383;

var PLAYER_MIN_X_POS = 2.5;
var PLAYER_MIN_Y_POS = -40;
var PLAYER_MAX_X_POS = 402.5;
var PLAYER_MAX_Y_POS = 383;

var NUM_ENENIES = 4;

//TODO: //
var Charactor = function(x,y,speed,sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
}
Charactor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/**
 * Enemy
 *
 */
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if(this.x>500){
        this.x = 0;
    }
    //check collision
    if (player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        console.log('collided');
        player.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Player
 *
 */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function() {
    //check whether the player has reached the top
    if (player.y <= 0) {
        player.x = PLAYER_START_POS_X;
        player.y = PLAYER_START_POS_Y;
        console.log('you made it!');//Win!!!

    }

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keyPress) {

    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
    //prevent the player from moving out of canvas
    if (player.y > PLAYER_MAX_Y_POS ) {
        player.y = PLAYER_MAX_Y_POS;
    }
    if (player.y < PLAYER_MIN_Y_POS ) {
        player.y = PLAYER_MIN_Y_POS;
    }
    if (player.x > PLAYER_MAX_X_POS) {
        player.x = PLAYER_MAX_X_POS;
    }
    if (player.x < PLAYER_MIN_X_POS) {
        player.x = PLAYER_MIN_X_POS;
    }
}
Player.prototype.reset = function() {
    this.x = PLAYER_START_POS_X;
    this.y = PLAYER_START_POS_Y;
}

/**
 * Inital
 *
 */
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(PLAYER_START_POS_X, PLAYER_START_POS_Y, 50);
var allEnemies = [];
for (var i=0; i < NUM_ENENIES; i++) {
    //var startX = Math.floor(Math.random() * 5);
    var startX = -(Math.floor((Math.random() * 5) + 1) * X);
    //var startY = Math.random() * 184 + 50;
    var startY = Math.floor((Math.random() * 3) + 1) * Y;
    var startSpeed = Math.floor((Math.random() * 50) + 50);
    allEnemies.push(new Enemy(startX,startY,startSpeed));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
