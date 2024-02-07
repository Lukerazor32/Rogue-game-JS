class Game {
    init() {
        this.tiles = [];
        this.field = document.querySelector(".field");
        this.potions = [];
        this.weapons = [];
        this.enemies = [];
        this.widthQuantity = 40;
        this.heightQuantity = 24;
        this.tileSizeX = parseFloat(window.getComputedStyle(this.field).getPropertyValue("width")) / this.widthQuantity;
        this.tileSizeY = parseFloat(window.getComputedStyle(this.field).getPropertyValue("height")) / this.heightQuantity;

        this.gameOverDiv = document.querySelector(".gameOver");
        this.gameOverDiv.querySelector("img").addEventListener("click", function() {location.reload();});
        this.gameOverDiv.style.display = "none";

        this.winDiv = document.querySelector(".win");
        this.winDiv.querySelector("img").addEventListener("click", function() {location.reload();});
        this.winDiv.style.display = "none";

        this.wallFilling();
        this.createRoutes();
        this.createPotions();
        this.createEnemies();

        this.player = new Player(this);
        document.addEventListener("keydown", (event) => this.update(event));
    }

    update(key) {
        this.player.update(key);
        if (this.enemies.length == 0) {
            this.win();
        }

        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }
    }

    wallFilling() {
        // ADDING WALLS
        for (let i = 0; i < this.widthQuantity; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.heightQuantity; j++) {
                this.tiles[i][j] = 1;
                let tile = this.createTile(i, j);
                tile.classList.add("tileW");
                this.field.appendChild(tile);
            }
        }
    }

    createRoutes() {
        let horizontalRoutes = this.getRandomInt(3, 5);
        let verticalRoutes = this.getRandomInt(3, 5);

        for (let i = 0; i < horizontalRoutes; i++) {
            let randomYTile = this.getRandomInt(0, this.heightQuantity - 1);
            for (let j = 0; j < this.widthQuantity; j++) {
                this.tiles[j][randomYTile] = 0;
                let tile = this.createTile(j, randomYTile);
                tile.classList.add("tile");

                this.field.appendChild(tile);
            }

            // ADDING ROOMS
            let x = this.getRandomInt(0, this.widthQuantity - 1);
            this.createRoom(x, randomYTile, this.getRandomInt(3, 8), this.getRandomInt(3, 8));
        }

        for (let i = 0; i < verticalRoutes; i++) {
            let randomXTile = this.getRandomInt(0, this.widthQuantity - 1);
            for (let j = 0; j < this.heightQuantity; j++) {
                this.tiles[randomXTile][j] = 0;
                let tile = this.createTile(randomXTile, j);
                tile.classList.add("tile");

                this.field.appendChild(tile);
            }

            // ADDING ROOMS
            let y = this.getRandomInt(0, this.heightQuantity - 1);
            this.createRoom(randomXTile, y, this.getRandomInt(3, 8), this.getRandomInt(3, 8));
        }
    }

    createRoom(xTile, yTile, width, height) {
        let xMax = xTile + width;
        let yMax = yTile + height;
        if (yMax > this.heightQuantity) {
            yMax = this.heightQuantity;
        }
        if (xMax > this.widthQuantity) {
            xMax = this.widthQuantity;
        }

        for (let i = xTile; i < xMax; i++) {
            for (let j = yTile; j < yMax; j++) {
                this.tiles[i][j] = 0;
                let tile = this.createTile(i, j);
                tile.classList.add("tile");

                this.field.appendChild(tile);
            }
        } 
    }

    createPotions() {
        let count = 0;
        while (count != 10) {
            let x = this.getRandomInt(count, this.widthQuantity - 1);
            let y = this.getRandomInt(count, this.heightQuantity - 1);
            if (this.tiles[x][y] === 0) {
                this.potions.push(new HealthPotion(this, x, y));
                count++;
            }
        }
        count = 0;
        while (count != 2) {
            let x = this.getRandomInt(count, this.widthQuantity - 1);
            let y = this.getRandomInt(count, this.heightQuantity - 1);
            if (this.tiles[x][y] === 0) {
                this.weapons.push(new Sword(this, x, y));
                count++;
            }
        }
    }

    createEnemies() {
        let count = 0;
        while (count != 10) {
            let x = this.getRandomInt(count, this.widthQuantity - 1);
            let y = this.getRandomInt(count, this.heightQuantity - 1);
            if (this.tiles[x][y] === 0) {
                this.enemies.push(new Enemy(x, y, this));
                count++;
            }
        }
    }

    createTile(x, y) {
        let tile = document.createElement("div");

        tile.style.backgroundSize = this.tileSizeX + 'px';
        tile.style.left = x * this.tileSizeX + 'px';
        tile.style.top = y * this.tileSizeY + 'px';
        tile.style.width = this.tileSizeX + 'px';
        tile.style.height = this.tileSizeY + 'px';

        return tile;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    win() {
        this.winDiv.style.display = "block";
        this.clear();
    }

    gameOver() {
        this.player = null;
        this.gameOverDiv.style.display = "block";
        this.clear();
    }

    clear() {
        document.removeEventListener("keydown", (event) => this.update(event));
    }
}