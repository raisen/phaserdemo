namespace MyGame {
    interface Level {
        Name: string,
        Constructor: Function
    }

    //Singleton class to maintain levels
    export class LevelOrder {
        private static instance: LevelOrder;
        order: Level[] = [{ Name: "Level1", Constructor: Level1 },
        { Name: "Level2", Constructor: Level2 },
        { Name: "FinalLevel", Constructor: FinalLevel },];

        static getInstance() {
            if (!LevelOrder.instance) {
                LevelOrder.instance = new LevelOrder();
                // ... any one time initialization goes here ...
            }
            return LevelOrder.instance;
        }

        //maybe look just keeping an index instead of destroying array
        nextState() {
            let next = this.order.shift() || { Name: null };
            return next.Name;
        }
    }
}