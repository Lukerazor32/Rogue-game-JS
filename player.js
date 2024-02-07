class Player extends Entity {
    constructor(game) {
        //POSITION GENERATION
        let xPos = game.getRandomInt(0, game.widthQuantity - 1);
        let yPos = game.getRandomInt(0, game.heightQuantity - 1);
        let isEmpty = false;
        while(!isEmpty) {
            if (game.tiles[xPos][yPos] == 0) {
                isEmpty = true;
            } else {
                xPos = game.getRandomInt(0, game.widthQuantity - 1);
                yPos = game.getRandomInt(0, game.heightQuantity - 1);
            }
        }
        
        super(game, 100, xPos, yPos, "tileP");
    }

    update(key) {
        super.clickListener(key);
        super.update();
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
    }

    checkCollision() {
        let enemies = this.game.enemies;
        for (let i = 0; i < enemies.length; i++) {
            if (this.xPos == enemies[i].xPos && this.yPos == enemies[i].yPos) {
                return false;
            }
        }
        return true;
    }

    checkAttack() {
        if (this.attack) {
            let enemies = this.game.enemies;
            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                for (let y = this.yPos - 1; y <= this.yPos + 1; y++) {
                    for (let x = this.xPos - 1; x <= this.xPos + 1; x++) {
                        if (enemy.yPos == y && enemy.xPos == x) {
                            enemy.getDamage(this.power);
                        }    
                    }
                } 
            }
        }
        this.attack = false;
    }

    checkBonuses() {
        //CHECK POTIONS
        let potionsLink = this.game.potions;
        let potionsImgs = this.field.querySelectorAll(".tileHP");
        this.checkObjects(potionsLink, potionsImgs, 0);
        //CHECK WEAPONS
        let weaponsLink = this.game.weapons;
        let weaponsImgs = this.field.querySelectorAll(".tileSW");
        this.checkObjects(weaponsLink, weaponsImgs, 1);
    }

    checkHealth() {
        if (this.health <= 0) {
            this.game.gameOver();
        }
    }
}