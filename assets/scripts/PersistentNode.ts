import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PersistentNode')
export class PersistentNode extends Component {
    private static _instance: PersistentNode;
    public amount = {
        missilesShouted:1,
        enemyPlaneCrasched:0,
        playerDestroyed:false,
        playerOutOfCanvase:false
    };

    onLoad() {
        if (PersistentNode._instance) {
            this.destroy(); // Ensures only one persistent node exists
            return;
        }
        PersistentNode._instance = this;
        director.addPersistRootNode(this.node); // Makes the node persist across scenes
    }

    public static get instance(): PersistentNode {
        return this._instance;
    }
}