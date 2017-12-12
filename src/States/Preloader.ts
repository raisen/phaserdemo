module MyGame {

    export class Preloader extends Phaser.State {

        preload() {

            this.game.load.image(KEYS.sky, './assets/sky.png');
            this.game.load.image(KEYS.ground, './assets/platform.png');
            this.game.load.image(KEYS.star, './assets/star.png');
            this.game.load.spritesheet(KEYS.dude, './assets/dude.png', 32, 48);
            this.game.load.spritesheet(KEYS.baddie, './assets/baddie.png', 32, 32);            
            this.game.load.audio(KEYS.audio_correct, './assets/correct.wav');
            this.game.load.audio(KEYS.audio_jump, './assets/jump.wav');
            this.game.load.audio(KEYS.audio_music, './assets/music.mp3');
        }

        create() {
            this.game.state.start(LevelOrder.getInstance().nextState(), true, false);
        }

    }

}