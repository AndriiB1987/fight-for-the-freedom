import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveEnemy2')
export class MoveEnemy2 extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('enemy2').getPosition().x,this.node.parent.getChildByName('enemy2').getPosition().y);
    }
}


