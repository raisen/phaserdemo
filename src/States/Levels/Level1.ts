module MyGame {

    export class Level1 extends Level {       
        levelName = "Level 1"
        
        create() {
            super.create();

            var ledge1 = this.platforms.create(400, 400, KEYS.ground);

            ledge1.body.immovable = true;

            var ledge2 = this.platforms.create(-150, 250, KEYS.ground);

            ledge2.body.immovable = true;

            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;

            new Enemy(this.game, this.game.world.width / 2 - 100, this.ground.y - this.ground.height, this.enemies);
            new Enemy(this.game, ledge1.x, ledge1.y - ledge1.height, this.enemies);
            new Enemy(this.game, ledge2.x, ledge2.y - ledge2.height, this.enemies);
            this.enemies.enableBody = true;
           
            this.game.physics.arcade.enable(this.enemies);
        }

        update() {
            super.update();
        }

        updateLevelComplete = () => {
            this.levelComplete = this.stars.children.every(x => (x as Star).alive == false)
        }

    }

} 