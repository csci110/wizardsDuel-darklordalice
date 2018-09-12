import { game, Sprite } from "../sgc/sgc.js";
game.setBackground("floor.png");

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleBoundrayContact() {
        // Delete spell when it leaves display area
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
        // Compare images so Stranger's spells don't destory each other.
        if (this.getImage() !== otherSprite.getImage()) {
            // Adjust mostly blank spell image to vertical center.
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                new Fireball(otherSprite);
            }
        }
        return false;
    }
}


class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 15);
        this.playAnimation("explode", true);
    }

    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(marcus)) {
            game.end("Marcus is defeated by the mysterious\nstranger in the dark cloak!\n\nBetter luck next time.");

        }

        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious\nstranger in the dark cloak!");
        }
    }
}

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("up", 0, 2);
        this.speedWhenWalking = 100;
        this.spellCastTime = 0;
    }

    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = -270;
    }

    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(522, this.y);
        this.speed = 0;
        // Keep Marcus in the disply area
    }

    handleSpacebar() {
        //if the current time is2 or more seconds greater than the pervious spellCastTime
        if (now - this.spellCastTime >= 2) {
            //rest the timer
            this.spellCastTime = now;
            //cast a spell
            let spell = new Spell;
            let now = game.getTime(); //get the number of seconds since game start
            spell.x = this.x + this.width; //this sets the position of the spell object equal to
            spell.y = this.y; //this position of any object created from the PlayerWizard class
            spell.name = "A spell cast by Marcus";
            spell.setImage("marcusSpellSheet.png");
            spell.angle = 0;
            this.playAnimation("right");
        }
    }
}

let marcus = new PlayerWizard();

class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The Mysterious Stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("left", 3, 5);
    }

    handleGameLoop() {
        if (this.y <= 0) {
            // Upward motion has reached top, so turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down");
        }

        if (this.y >= game.displayHeight - this.height) {
            // Downward motion has reached bottom, so turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up");
        }

        if (Math.random() < 0.01) {
            let spell = new Spell;
            spell.x = this.x - this.width;
            spell.y = this.y;
            spell.name = "A spell cast by Mysterious Stranger";
            spell.setImage("strangerSpellSheet.png");
            spell.angle = 180;
            this.playAnimation("left");
        }
    }

    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }

    handleSpacebar() {
        let spell = new Spell;
        spell.x = this.x - this.width;
        spell.y = this.y;
        spell.name = "A spell cast by Mysterious Stranger";
        spell.setImage("strangerSpellSheet.png");
        spell.angle = 180;
        this.playAnimation("left");
    }
}

let stranger = new NonPlayerWizard();
