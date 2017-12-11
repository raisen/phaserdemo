module MyGame {

    export class Boot extends Phaser.State {

        preload() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create() {
            this.game.state.start('Preloader', true, false);
        }

    }

}