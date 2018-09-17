import { game, Sprite } from "../sgc/sgc.js";
game.setBackground("floorTile.png"); // Photo credit: Deviantart.net

class Arrow extends Sprite { 
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation();
        this.playAnimation(); // add true
    }

    handleBoundrayContact() {
        // deletes the thing when it leaves the area
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
        // compare images so other character's things dont destory eachother
        if (this.getImage() !== otherSprite.getImage()) {
            // adjust so there is blank space in the center
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                New Thing(otherSprite); // change thing to whatever youre going to make their death thing
            }
        }
        return false;
    }
}

class Thing extends Sprite {
    constructor() {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage(); // whatever image you choose
        game.removeSprite(deadSprite);
        this.defineAnimation();
        this.playAnimation(); // dont add true
    }

    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(character)) {
            game.end() //add end message
        }

        if (!game.isActiveSprite(otherdude)) { // replace otherdude
            game.end() //add end message
        }

    }
}

class PlayerArcher extends Sprite() {
    constructor() {
        super();
        this.name = "Link"; 
        this.setImage() // fix animation strip
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down"); // add numbers
        this.defineAnimation("up"); // add numbers
        this.defineAnimation("left"); // add numbers
        this.defineAnimation("right"); // add numbers
        this.speedWhenWalking = 150;
        this.arrowShootTime = 0;
    }
    
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = speedWhenWalking;
        this.angle = -270;
    }
    
    handleLeftArrowKey() {
        this.playAnimation("left");
        this.speed = speedWhenWalking;
        this.angle = 170; // check this
    }
    
    handleRightArrowKey() {
        this.playAnimation("right");
        this.speed = speedWhenWalking;
        this.angle = -170; // check this
    }
    
    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(522, this.y);
        this.speed = 0;
        // keeps Link in the area
    }
    
    handleSpacebar() {
        // if the current time is 2 or more secs greater than the previous spellCastTime
        let now = game.getTime(); // get the number of secs since the game start
        if (now - this.arrowShootTime >= 2) {
            // rest the timer
            this.arrowShootTime = now;
            // shoot arrow
            let arrow = new Arrow;
            arrow.x = this.x + this.width; // sets the position of the arrow object equal to
            arrow.y = this.y; // this position of any object created from the PlayerArcher class
            arrow.name = "An Arrow Shot by Link";
            arrow.setImage(); // find image of an arrow
            arrow.angle = 0;
            this.playAnimation("down");
        }
    }
}