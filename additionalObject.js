class AdditionalObject {
    constructor(game, xPos, yPos, imgPath) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;
        this.effect = 10;
        let img = game.createTile(xPos, yPos);
        img.classList.add(imgPath);
        game.field.appendChild(img);
    }
}