import { _decorator, Component, Node, UITransform, Vec3, view, Game, director, Canvas, PolygonCollider2D, Collider2D, IPhysics2DContact, Contact2DType  } from 'cc';
import { PlayersJet } from './PlayersJet';
const { ccclass, property } = _decorator;

@ccclass('MoveBullet')
export class MoveBullet extends Component {

    @property({
        // type:number,
        tooltip: 'CANVAS HIGH VALUE'
    })
    public BulletSpeed:number = -1777;
    public playerJet :PlayersJet;
    @property({
        type: Node,
        tooltip: 'CANVAS HIGH VALUE'
    })  
    public cnv: Node;
    public canvH:number;
    public hitSomething:boolean;
    public hitGreenBullet:boolean;

    start() {
 
    }


    onLoad() {

        // this.onBeginContact
}
    update(dt) {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const currentPosition = this.node.position;
        const newY = currentPosition.y - (this.BulletSpeed * dt);
        this.node.setPosition(this.node.position.x,newY);   
        // if(this.node.position.y <= -(canvas.getComponent(UITransform).height)){
        //     this.destroyBullet()
        // }
    }

// destroyBullet(){
//     console.log('>   bullet is destruyed in new ver  <')
//     // this.playerJet.destroyPlayerBullets()
//      this.node.destroy()
// }
}

