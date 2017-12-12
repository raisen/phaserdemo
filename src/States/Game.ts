module MyGame {
    
       export class Game extends Phaser.Game {           
           constructor() {
    
               super(800, 600, Phaser.AUTO, '', null);
               
               this.state.add('Boot', Boot, false);
               this.state.add('Preloader', Preloader, false);              
               
               //load levels dynamically
               LevelOrder.getInstance().order.forEach(level=>{
                this.state.add(level.Name, level.Constructor, false);                
               })
               
               this.state.start('Boot');
           }
    
       }
    
   } 