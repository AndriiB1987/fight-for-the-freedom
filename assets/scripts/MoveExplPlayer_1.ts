import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveEnemy1')
export class MoveEnemy1 extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('enemy1').getPosition().x,this.node.parent.getChildByName('enemy1').getPosition().y);
    }
}


