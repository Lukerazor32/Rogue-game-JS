class Entity {
    constructor(game, maxHealth, xPos, yPos, entityClass) {
        this.game = game;
        this.field = game.field;
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.healthImg;
        this.power = 10;
        this.xPos = xPos;
        this.yPos = yPos;

        this.entityDiv = game.createTile(xPos, yPos);
        this.entityDiv.classList.add(entityClass);

        //CREATING HEALTH
        this.healthDiv = game.createTile(this.xPos, this.yPos);
        this.healthDiv.style.left = "0px";
        this.healthDiv.style.top = "0px";
        this.drawHealth();
        this.healthDiv.style.height = "3px";
        this.healthDiv.classList.add("health");
        this.entityDiv.appendChild(this.healthDiv);

        this.field.appendChild(this.entityDiv);
    }

    update() {
        this.checkMoving();
        this.checkBonuses();
        this.drawHealth();
        this.checkHealth();
        this.checkAttack();
        this.drawMoving();
    }

    getDamage(damage) {
        this.health -= damage;
    }

    clickListener(key) {
        switch (key.keyCode) {
            case 87:
                this.up = true;
                break;
            case 83:
                this.down = true;
                break;
            case 68:
                this.right = true;
                break;
            case 65:
                this.left = true;
                break;
            case 32:
                this.attack = true;
                break;
            default:
                break;
        }
    }

    checkMoving() {
        if(this.up && this.yPos > 0 && this.game.tiles[this.xPos][this.yPos - 1] == 0) {
            this.yPos--;

            if (!this.checkCollision()) {
                this.yPos++;
            }
        }

        else if(this.down && this.yPos < game.heightQuantity - 1 && this.game.tiles[this.xPos][this.yPos + 1] == 0) {
            this.yPos++;

            if (!this.checkCollision()) {
                this.yPos--;
            }
        }

        else if(this.right && this.xPos < game.widthQuantity - 1 && this.game.tiles[this.xPos + 1 ][this.yPos] == 0) {
            this.xPos++;

            if (!this.checkCollision()) {
                this.xPos--;
            }
        }

        else if(this.left && this.xPos > 0 && this.game.tiles[this.xPos - 1][this.yPos] == 0) {
            this.xPos--;

            if (!this.checkCollision()) {
                this.xPos++;
            }
        }

        else {
            return true;
        }

        return false;
    }

    checkCollision() {}

    checkAttack() {}

    checkBonuses() {}

    increaseHealth(value) {
        if (this.health < 100) {
            this.health += value;
            return true;
        }
        return false;
    }

    drawHealth() {
        this.healthImg = this.health / this.maxHealth * this.game.tileSizeX;
        this.healthDiv.style.width = this.healthImg + "px";
    }

    checkObjects(objectLink, objectImgs, index) {
        for (let i = 0; i < objectLink.length; i++) {
            if (objectLink[i].xPos == this.xPos && objectLink[i].yPos == this.yPos) {
                switch (index) {
                    case 0:
                        if (!this.increaseHealth(objectLink[i].effect)) {
                            return;
                        }
                        break;
                    case 1:
                        this.power += objectLink[i].effect;
                    default:
                        break;
                }
                objectLink.splice(i, 1);
                this.field.removeChild(objectImgs[i]);
            }
        }
    }

    drawMoving() {
        this.entityDiv.style.left = this.xPos * this.game.tileSizeX + 'px';
        this.entityDiv.style.top = this.yPos * this.game.tileSizeY + 'px';
    }
}