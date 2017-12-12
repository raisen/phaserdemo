module MyGame {

    export class Level2 extends Level {

        levelName = "Level 2"
       
        create() {
            super.create();
            
            var ledge = this.platforms.create(300, 300, KEYS.ground);

            ledge.body.immovable = true;

            ledge = this.platforms.create(-150, 450, KEYS.ground);

            ledge.body.immovable = true;
        }

        update() {
            super.update();
        }

        updateLevelComplete = () => {
            this.levelComplete = this.stars.children.every(x => (x as Star).alive == false)
        }
    }

} 