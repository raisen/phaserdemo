
namespace MyGame {
    export class Star extends Phaser.Sprite {

        flickerRef;
        flickering = false;
        landingTime = 0;
        constructor(public game: Phaser.Game, x: number, y: number, group: Phaser.Group, public points: number, public lifespanAfterLanding?, frame?: string | number) {

            super(game, x, y, KEYS.star, frame);

            if (!this.lifespanAfterLanding) {
                let lifeSpans = [3000, 4000, 5000, 6000];
                this.lifespanAfterLanding = lifeSpans[Math.floor(Math.random() * 3)]
            }

            group.add(this);
            this.body.gravity.y = 20;
            this.points = points;
        }

        flicker() {
            if (!this.flickering) {
                this.flickering = true;
                this.flickerRef = setInterval(() => {
                    //flicker when less than 2 seconds of life left                
                    if (this.lifespanAfterLanding - (this.game.time.now - this.landingTime) < 2000) {
                        this.visible = !this.visible;
                    }
                }, 100);
            }
        }

        kill() {
            clearInterval(this.flickerRef);
            return super.kill();
        }

        
    }
}