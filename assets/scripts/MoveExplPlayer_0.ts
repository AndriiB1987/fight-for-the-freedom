import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveEnemy0')
export class MoveEnemy0 extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('enemy0').getPosition().x,this.node.parent.getChildByName('enemy0').getPosition().y);

    }
}


