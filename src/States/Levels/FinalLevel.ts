module MyGame {
    
        export class FinalLevel extends Level {
            
            levelName = "The End.."
            
            create() {
                super.create();
    
                var ledge = this.platforms.create(300, 200, KEYS.ground);
    
                ledge.body.immovable = true;
    
                ledge = this.platforms.create(-275, 300, KEYS.ground);
                
                ledge.body.immovable = true;
                
                ledge = this.platforms.create(-250, 350, KEYS.ground);
                
    
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