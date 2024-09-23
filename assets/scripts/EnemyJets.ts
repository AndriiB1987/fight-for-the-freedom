import { _decorator, Canvas, Collider2D, Component, Contact2DType, director, instantiate, IPhysics2DContact, macro, Node, Prefab, repeat, tween, Tween, TweenAction, UITransform, v2, Vec2, Vec3, Vec4, view,  } from 'cc';
import { MoveBullet } from './MoveBullet';
import { PlayersJet } from './PlayersJet';
import { GetCanvas } from './GetCanvas';
import { PersistentNode } from './PersistentNode';
const { ccclass, property } = _decorator;

@ccclass('EnemyJets')
export class EnemyJets extends Component {
    [x: string]: any;
    @property(Prefab)
    yellowBullet:Prefab = null;
    public createYellowBullet:Node = null;  
    @property
    shootFrequency:number = 3.0;
    @property
    duration:number = 0.5;
    @property
    moveAmountX:number = 100;
    @property
    moveAmountY:number = 20;
    public hitYelowBullet:boolean;
    public playerOutOfCanvase:boolean;
    public yellowB:MoveBullet;
    public jet:PlayersJet;
    public ranX:number;
    public canvasWidht:number;
    public myCanvas:GetCanvas;
    start(){
        this.randomValue();
        this.playerOutOfCanvase = false;
    }

    randomValue(){
        const uiTransform = 1700;
        let randomX = Math.random() * uiTransform;
        this.ranX = randomX;
    }
    setMovements(){
        let moveLeft = tween(this.node)
        .by(this.duration, { position: new Vec3(-this.moveAmountX, -this.moveAmountY) },{
             easing: "smooth",
        } )
      .repeatForever()
    .start() 
    this.randomValue();
    tween(this.node)
    .to(this.tweenDuration, { position: new Vec3(  this.ranX-900, 1800) } )
    .repeatForever( moveLeft)
    .start() 
    
    }       
    shootEnemyBullets(){
        this.createYellowBullet = instantiate(this.yellowBullet);
        this.createYellowBullet.setPosition(this.node.position.x,this.node.position.y)
        this.node.parent.addChild( this.createYellowBullet);
        this.createYellowBullet.setSiblingIndex(2);
    }
  
    onLoad(){
        this.randomValue();
        console.log("new coordinate  - "+this.ranX)
        this.moveEnemy = this.setMovements();
        this.schedule(this.shootEnemyBullets, this.shootFrequency, macro.REPEAT_FOREVER, 3.0 )
        director.preloadScene('Menu')
    }
    
    update(dt) {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        if(this.node.position.y <= -(canvas.getComponent(UITransform).height -1400)){
            console.log("Plane out of CANVAS")
            this.playerOutOfCanvase = true;
            if(this.playerOutOfCanvase == true){
                PersistentNode.instance.amount.playerOutOfCanvase = true;
            }
            
            director.loadScene('Dialog');
        }
    }
}