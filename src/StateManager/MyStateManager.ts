namespace MyGame
{
    export class MyStateManager {
        private static instance: MyStateManager;
        private state:LevelChangedState;
        private constructor() {
            // do something construct...
        }
        static getInstance() {           
            if (!MyStateManager.instance) {
                MyStateManager.instance = new MyStateManager();
                // ... any one time initialization goes here ...
            }
            return MyStateManager.instance;
        }
        
        saveState(state:LevelChangedState){            
            this.state = state;
        }
        getState()
        {
            return this.state;
        }
    }
}