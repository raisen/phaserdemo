var MyGame;
(function (MyGame) {
    var MyStateManager = /** @class */ (function () {
        function MyStateManager() {
            // do something construct...
        }
        MyStateManager.getInstance = function () {
            if (!MyStateManager.instance) {
                MyStateManager.instance = new MyStateManager();
                // ... any one time initialization goes here ...
            }
            return MyStateManager.instance;
        };
        MyStateManager.prototype.saveState = function (state) {
            this.state = state;
        };
        MyStateManager.prototype.getState = function () {
            return this.state;
        };
        return MyStateManager;
    }());
    MyGame.MyStateManager = MyStateManager;
})(MyGame || (MyGame = {}));
