import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveTruster')
export class MoveTruster extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('enemy0').getPosition().x,this.node.parent.getChildByName('enemy0').getPosition().y);
        // this.node.setPosition(this.node.parent.getChildByName('player').getPosition.,this.node.parent.getChildByName('player').getPosition.y,this);
        // this.node.setPosition(this.node.parent.getChildByName('player').getPosition.,this.node.parent.getChildByName('player').getPosition.y,this);
    }
}


