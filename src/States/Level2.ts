module MyGame {

    export class Level2 extends Phaser.State {

        player: Phaser.Sprite;
        platforms: Phaser.Group;
        stars: Phaser.Group;
        scoreText;
        levelText;
        score = 0;
        create() {
            this.score = MyStateManager.getInstance().getState().score;

            this.game.add.sprite(0, 0, KEYS.sky);

            this.platforms = this.game.add.group();

            this.platforms.enableBody = true;

            var ground = this.platforms.create(0, this.game.world.height - 64, KEYS.ground);

            ground.scale.setTo(2, 2);

            ground.body.immovable = true;

            var ledge = this.platforms.create(300, 300, KEYS.ground);

            ledge.body.immovable = true;

            ledge = this.platforms.create(-150, 450, KEYS.ground);

            ledge.body.immovable = true;

            this.player = this.game.add.sprite(32, this.game.world.height - 150, KEYS.dude);

            this.game.physics.arcade.enable(this.player);

            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 300;
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);


            this.stars = this.game.add.group();

            this.stars.enableBody = true;


            for (var i = 0; i < 12; i++) {
                var star = new Star(this.game, i * 70, 0, this.stars, 10);
            }
            this.game.add.text(16, 16, 'Level 2', { font: '12px Arial', fill: '#000' });
            this.scoreText = this.game.add.text(16, 32, 'score: ' + this.score, { font: '12px Arial', fill: '#000' });
        }

        update() {
            var cursors = this.game.input.keyboard.createCursorKeys();

            var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
            var starsHitPlatform = this.game.physics.arcade.collide(this.stars, this.platforms, this.starLanded);
            this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);




            this.player.body.velocity.x = 0;

            if (cursors.left.isDown) {
                this.player.body.velocity.x = -150;
                this.player.animations.play('left');
            }
            else if (cursors.right.isDown) {
                this.player.body.velocity.x = 150;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 4;
            }

            if (cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
                this.player.body.velocity.y = -350;
            }
        }

        collectStar = (player, star: Star) => {
            star.kill();
            this.score += star.points;
            this.scoreText.text = 'Score: ' + this.score;
        }

        starLanded = (star: Star) => {
            if (!star.landingTime) {
                star.landingTime = this.game.time.now;
                star.points = 5;
                star.flicker();
                setTimeout(() => {
                    star.kill();
                }, star.lifespanAfterLanding)
            }
        }

    }

} 