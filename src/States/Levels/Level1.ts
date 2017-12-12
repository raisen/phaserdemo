module MyGame {

    export class Level1 extends Level {
        
        levelName = "Level 1"
        
        create() {
            super.create();

            var ledge = this.platforms.create(400, 400, KEYS.ground);

            ledge.body.immovable = true;

            ledge = this.platforms.create(-150, 250, KEYS.ground);

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