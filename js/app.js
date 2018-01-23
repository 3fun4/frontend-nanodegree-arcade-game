/**
 *
 *
 */

var COL_SPACE = 25;

var BLOCK_X = 101;
var BLOCK_Y = 83;

var PLAYER_START_POS_X = 202.5;
var PLAYER_START_POS_Y = 383;

var PLAYER_MIN_X_POS = 2.5;
var PLAYER_MIN_Y_POS = -40;
var PLAYER_MAX_X_POS = 402.5;
var PLAYER_MAX_Y_POS = 383;

var NUM_ENENIES = 4;

//timer
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});

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
    for (var i = this.x; i <= this.x+BLOCK_X; i++) {
        if (i >= player.x+COL_SPACE && i <= player.x+BLOCK_X-COL_SPACE) {
            for (var j = this.y-BLOCK_Y; j <= this.y; j++) {
                if (j >= player.y-BLOCK_Y+COL_SPACE && j <= player.y-COL_SPACE) {
                    player.reset();
                }
            }
        }
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
    //check whether the player has reached the top
    if (player.y <= 0) {
        player.x = PLAYER_START_POS_X;
        player.y = PLAYER_START_POS_Y;
        console.log('you made it!');//Win!!!
        //TODO: //display an animation
        timer.pause();
        swal({
            position: 'top',
            allowOutsideClick:false,
            showCancelButton: false,
            type: 'success',
            title: 'Congrats! You win!',
            html:
                `<span>Time:${timer.getTimeValues().toString()}</span>`
        }).then((result) => {
          if (result.value) {
            //reset the game
            resetGame();
          }
        });
    }
}
Player.prototype.reset = function() {
    this.x = PLAYER_START_POS_X;
    this.y = PLAYER_START_POS_Y;
}

//reset the game
var resetGame = function() {
    timer.stop();
    timer.start();
    player.reset();
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
    var startX = Math.random() * 100;
    var startY = Math.random() * 184 + 50;
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
