module MyGame {

    export abstract class Level extends Phaser.State {
        player: Phaser.Sprite;
        platforms: Phaser.Group;
        enemies: Phaser.Group;
        stars: Phaser.Group;
        abstract levelName: string;
        scoreText;
        score = 0;
        ground: Phaser.Sprite;
        levelComplete = false;

        create() {
            this.game.add.audio(KEYS.audio_music, .5, true).play();
            
            this.game.add.sprite(0, 0, KEYS.sky);
            this.game.add.text(16, 16, this.levelName, { font: '12px Arial', fill: '#000' });
            this.score = MyStateManager.getInstance().getState().score || 0;
            this.scoreText = this.game.add.text(16, 32, 'score: ' + this.score, { font: '12px Arial', fill: '#000' });

            this.player = this.game.add.sprite(32, this.game.world.height - 150, KEYS.dude);

            this.game.physics.arcade.enable(this.player);

            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 300;
            this.player.body.collideWorldBounds = true;

            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);

            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;

            this.ground = this.platforms.create(0, this.game.world.height - 64, KEYS.ground);

            this.ground.scale.setTo(2, 2);

            this.ground.body.immovable = true;

            this.stars = this.game.add.group();

            this.stars.enableBody = true;

            for (var i = 0; i < 12; i++) {
                var star = new Star(this.game, i * 70, 0, this.stars, 10);
            }
        }

        loadNextLevel() {
            MyStateManager.getInstance().saveState({ score: this.score });
            let nextState = LevelOrder.getInstance().nextState();
            if (nextState) {
                this.game.state.start(nextState);
            }
            else
            {
                this.game.paused = true;
                if(this.score>=100)
                {
                    alert("You win!!")
                    
                }
                else
                {
                    alert("You suck!")
                }
            }
        }

        update() {

            if (this.levelComplete) {
                return this.loadNextLevel();
            }

            if(this.enemies) {
                this.enemies.callAll('update', null);
            }
            
            var enemyHitPlatform = this.game.physics.arcade.collide(this.enemies, this.platforms, this.enemyPlatformCollided);
            var enemyHitPlayer = this.game.physics.arcade.collide(this.enemies, this.player, this.enemyPlayerCollided, null, this);

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
                new Phaser.Sound(this.game, KEYS.audio_jump, 1, false).play();
                this.player.body.velocity.y = -350;
            }
        }

        enemyPlatformCollided(enemy, platform) {
            enemy.onPlatform = platform;
        }

        enemyPlayerCollided(enemy, player) {
            enemy.body.velocity.x *= -1;
        }

        collectStar = (player, star: Star) => {
            new Phaser.Sound(this.game, KEYS.audio_correct, .2, false).play();           
            star.kill();
            this.score += star.points;
            this.scoreText.text = 'Score: ' + this.score;
            this.updateLevelComplete();
        }

        starLanded = (star: Star) => {
            if (!star.landingTime) {
                star.landingTime = this.game.time.now;
                star.points = 5;
                star.flicker();
                setTimeout(() => {
                    star.kill();
                    this.updateLevelComplete();
                }, star.lifespanAfterLanding)
            }
        }

        //check for level-specific completion scenario
        abstract updateLevelComplete = () => { };
    }
} 