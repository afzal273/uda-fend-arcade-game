
/**
 * @constructor for Enemy
 */
var Enemy = function() {

    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';

    // always start the enemy from the left of the screen
    this.x = 0;
    // have the enemy start at one of the 3 boxes
    this.y = this.yLength * this.startPositions[Math.floor(Math.random() * this.startPositions.length)];
    // have the enemy start at one of the 7 speeds
    this.speed = this.speedOptions[Math.floor(Math.random() * this.speedOptions.length)];

};

/**
 *
 * @param dt - a time delta between ticks
 *  Update the enemy's position, required method for game
 * Move the enemy across the screen and start from the beginning once enemy crosses the screen
 */

Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    // on crossing the canvas start again
    if (this.x > window.ctx.canvas.clientWidth) {
        this.x = 0;
        this.y = this.yLength * this.startPositions[Math.floor(Math.random() * this.startPositions.length)];
        this.speed = this.speedOptions[Math.floor(Math.random() * this.speedOptions.length)];
    }
};

// Enemy's width
Enemy.prototype.xLength = 101;
// Enemy looks slightly wider than player, compensate for that during collision
Enemy.prototype.xComp = 20;
// Enemy's height
Enemy.prototype.yLength = 83;
// Enemy looks slightly taller than player, compensate for that during collision
Enemy.prototype.yComp = 20;
// Start position options for enemy
Enemy.prototype.startPositions = [0.75, 1.75, 2.75];
// Speed options for enemy
Enemy.prototype.speedOptions = [100, 150, 200, 250, 300, 350, 400];

/**
 * Function to render enemy
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 *
 * @constructor for Player
 * Initialize starting point for the player and give it 5 lives to start with
 */
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = this.xLength * this.xStart;
    this.y = this.yLength * this.yStart;
    this.lives = 5;
};

// Player's width
Player.prototype.xLength = 101;
// Player's height
Player.prototype.yLength = 83;
// Starting x and y coordinate multipliers for player
Player.prototype.xStart = 2;
Player.prototype.yStart = 4.8;

// Bounds for players to not go beyond the canvas
Player.prototype.leftBound = -20;
Player.prototype.upBound = -42;
Player.prototype.downBound = 38;

// The Y level at which player wins
Player.prototype.victoryY = 66;

/**
 * Render the player on screen
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Handle player movement
 * @param key - the direction player is to be moved
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            var toAssignLeftX = this.x - this.xLength;
            if (toAssignLeftX > this.leftBound) {
                this.x = toAssignLeftX;
            }
            break;
        case 'up':
            var toAssignUpY = this.y - this.yLength;

            if (toAssignUpY > this.upBound) {
                this.y = toAssignUpY;
            }

            break;
        case 'right':
            var toAssignRightX = this.x + this.xLength;
            if (toAssignRightX < window.ctx.canvas.clientWidth) {
                this.x = toAssignRightX;
            }
            break;
        case 'down':
            var toAssignDownY = this.y + this.yLength;
            if (toAssignDownY < window.ctx.canvas.clientWidth - this.downBound) {
                this.y = toAssignDownY;
            }
            break;

        default:
            break;

    }
};


// Instantiating objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', eventListenerFunc);

/**
 * Event listener function for player movement
 * @param e - the event
 */
function eventListenerFunc(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

}