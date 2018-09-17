import { game, Sprite } from "../sgc/sgc.js";
game.setBackground("floorTile.png"); // Photo credit: Deviantart.net

class Arrow extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("arrow", 0, 7);
        this.playAnimation("arrow", true);
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
                new Evaporate(otherSprite);
            }
        }
        return false;
    }
}

class Evaporate extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("evaporate.png");
        game.removeSprite(deadSprite);
        this.defineAnimation("evaporate", 0, 15);
        this.playAnimation("evaporate");
    }

    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(ganondorf)) {
            game.end("Link is Defeat by Ganondorf" +
                "\nBad End");
        }

        if (!game.isActiveSprite(link)) {
            game.end("Ganondorf is Defeated by Link" +
                "\nGood End");
        }

    }
}

class PlayerArcher extends Sprite {
    constructor() {
        super();
        this.name = "Link";
        this.setImage("link.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.speedWhenWalking = 150;
        this.arrowShootTime = 0;
    }

    handleDownArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleUpArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = -270;
    }

    handleLeftArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }

    handleRightArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = -170;
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
            arrow.setImage("arrow.png");
            arrow.angle = -0;

        }
    }
}

let link = new PlayerArcher();

class NonPlayerArcher extends Sprite {
    constructor() {
        super();
        this.name = "Ganondorf";
        this.setImage("ganondorf.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 200;
    }

    handleGameLoop() {
        if (this.y <= 0) {
            this.y = 0;
            this.angle = 270;
        }

        if (this.y >= game.displayHeight - this.height) {
            //downward motion has reached bottom, so turnup
            this.y = game.displayHeight - this.height;
            this.angle = 90;
        }

        if (Math.random() < 0.01) {
            let arrow = new Arrow;
            arrow.x = this.x - this.width;
            arrow.y = this.y;
            arrow.name = "An arrow cast by Ganondorf";
            arrow.setImage("ganonArrow.png");
            arrow.angle = 180;
        }
    }

    handleAnimationEnd() {
        if (this.angle === 90) {}
        if (this.angle === 270) {}
    }

    handleSpacebar() {
        let arrow = new Arrow;
        arrow.x = this.x - this.width;
        arrow.y = this.y;
        arrow.name = "An arrow shot by ganondorf";
        arrow.setImage("ganonArrow.png");
        arrow.angle = 180;
    }
}

let ganondorf = new NonPlayerArcher();
