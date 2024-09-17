import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovePlayer')
export class MovePlayer extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('player').getPosition().x,this.node.parent.getChildByName('player').getPosition().y);

    }
}


