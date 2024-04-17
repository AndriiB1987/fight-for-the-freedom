import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveTruster')
export class MoveTruster extends Component {
    start() {

    }

    update(dt) {
        this.node.setPosition(this.node.parent.getChildByName('player').getPosition().x+=5,this.node.parent.getChildByName('player').getPosition().y-=130);
        // this.node.setPosition(this.node.parent.getChildByName('player').getPosition.,this.node.parent.getChildByName('player').getPosition.y,this);
        // this.node.setPosition(this.node.parent.getChildByName('player').getPosition.,this.node.parent.getChildByName('player').getPosition.y,this);
    }
}


