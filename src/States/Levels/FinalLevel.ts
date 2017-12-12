module MyGame {
    
        export class FinalLevel extends Level {
            
            levelName = "The End.."
            
            create() {
                super.create();
    
                var ledge1 = this.platforms.create(300, 200, KEYS.ground);
    
                ledge1.body.immovable = true;
    
                var ledge2 = this.platforms.create(-275, 300, KEYS.ground);
                
                ledge2.body.immovable = true;
                
                var ledge3 = this.platforms.create(-250, 350, KEYS.ground);
               
                    ledge3.body.immovable = true;

                this.enemies = this.game.add.group();
                this.enemies.enableBody = true;
    
                new Enemy(this.game, this.game.world.width / 2 - 40, this.ground.y - this.ground.height, this.enemies);
                new Enemy(this.game, this.game.world.width, this.ground.y - this.ground.height, this.enemies);
                new Enemy(this.game, ledge1.x + ledge1.width - 32, ledge1.y - ledge1.height, this.enemies);
                new Enemy(this.game, ledge1.x + 40, ledge1.y - ledge1.height, this.enemies);
                new Enemy(this.game, ledge2.x - 20, ledge2.y - ledge2.height, this.enemies);
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