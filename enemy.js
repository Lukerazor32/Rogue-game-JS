class Enemy extends Entity {
    constructor(x, y, game) {
        super(game, 30, x, y, "tileE");
        this.isDead = false;
        this.chooseDirection();
    }

    checkMoving() {
        if (super.checkMoving()) {
            this.chooseDirection();
        }
    }

    checkHealth() {
        if (this.health <= 0 && !this.isDead) {
            this.die();
        }
    }

    checkAttack() {
        if (this.checkPlayer()) {
            this.game.player.getDamage(this.power);
            this.up = false;
            this.down = false;
            this.right = false;
            this.left = false;
        }
    }

    checkPlayer() {
        for (let i = this.yPos - 1; i < this.yPos + 1; i++) {
            for (let j = this.xPos - 1; j < this.xPos + 1; j++) {
                if (this.game.player.xPos == j && this.game.player.yPos == i) {
                    return true;
                }
            }
        }
        return false;
    }

    chooseDirection() {
        switch (this.game.getRandomInt(0, 3)) {
            case 0:
                this.up = true;
                this.down = false;
                this.right = false;
                this.left = false;
                break;
            case 1:
                this.up = false;
                this.down = true;
                this.right = false;
                this.left = false;
                break;
            case 2:
                this.up = false;
                this.down = false;
                this.right = true;
                this.left = false;
                break;
            case 3:
                this.up = false;
                this.down = false;
                this.right = false;
                this.left = true;
                break;
            default:
                break;
        }
    }

    checkCollision() {
        let player = this.game.player;
        if (this.xPos == player.xPos && this.yPos == player.yPos) {
            return false;
        }
        return true;
    }

    die() {
        this.isDead = true;
        this.field.removeChild(this.entityDiv);
    }

    dieFromGauntlet() {
        this.die();
        this.game.gauntletOff();
    }
}