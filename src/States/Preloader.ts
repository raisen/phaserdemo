module MyGame {

    export class Preloader extends Phaser.State {

        preload() {

            this.game.load.image(KEYS.sky, './assets/sky.png');
            this.game.load.image(KEYS.ground, './assets/platform.png');
            this.game.load.image(KEYS.star, './assets/star.png');
            this.game.load.spritesheet(KEYS.dude, './assets/dude.png', 32, 48);

        }

        create() {
            this.game.state.start('Level1', true, false);
        }

    }

}