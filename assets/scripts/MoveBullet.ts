import { _decorator,screen, Component, Node, UITransform, Vec3, view, Game, director, Canvas, PolygonCollider2D, Collider2D, IPhysics2DContact, Contact2DType  } from 'cc';
import { PlayersJet } from './PlayersJet';
const { ccclass, property } = _decorator;

@ccclass('MoveBullet')
export class MoveBullet extends Component {
    public scene = screen.windowSize;

    @property({
        // type:number,
        tooltip: 'bullet speed'
    })
    public BulletSpeed:number = -1777;

    update(dt) {
        const currentPosition = this.node.position;
        const newY = currentPosition.y - (this.BulletSpeed * dt);
        this.node.setPosition(this.node.position.x,newY);  
        if (this.node.position.y > (this.scene.height+777)){
        this.node.destroy()
        }  
    }
}

