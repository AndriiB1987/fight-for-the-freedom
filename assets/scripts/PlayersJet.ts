import { _decorator, Component, macro, Node, Vec3, director, EventKeyboard, Scene, Prefab, instantiate, Label,KeyCode, Input, input, Collider2D, Contact2DType, IPhysics2DContact, NodePool, UITransform, Canvas  } from 'cc';
import { Game } from './Game';
import { MoveBullet } from './MoveBullet';
const { ccclass, property } = _decorator;
@ccclass('PlayersJet')
export class PlayersJet extends Component {
   
    moveLeft:number =0;
    moveRight:number =0;
    @property(Prefab)
    greenBullet:Prefab = null;
    private canvasWidth: number;
    private canvasHeight: number;
    public playersBullet:Node = null; 
    public playersBulletNew:Node; 
    public game:Game = null; 
    public hitSomething:boolean;
    public hitGreenBullet:boolean;

      bulletShouted:boolean = false;

    public pool = new NodePool;
    public createBulletNode:Node = null;  


    public canvasWidht:number;
    // public bulletSpeedGame:number = null;
    // public bul: MoveBullet;

    getCanvaSize(){


        this.canvasWidht = this.node.parent.getComponent(UITransform).contentSize.width;
 
        //  console.log("  Get CANVAS  - "+  this.wdthMy)
    }
    start() {
        this.getCanvaSize();
        console.log("!!!!!! canvs in PLayerS  - "+ this.canvasWidht)
      }
    initPool(){
        //build the amount of nodes needed at a time
        let initCount = 150;

        //fill up the node pool
        for (let i = 0; i < initCount; i++) {
            // create the new node
            let createBullet = instantiate(this.greenBullet); //instantiate means make a copy of the orginal
            // createBullet.setPosition(this.node.position.x,this.node.position.y)
            // put first one on the screen. So make it a child of the canvas.
            if (i == 0) {
                this.node.parent.addChild(createBullet);
            } else {
                //put others into the nodePool
                this.pool.put(createBullet);
            }
        }
    }
    addPool() {
        //if the pool is not full add a new one, else get the first one in the pool
        if (this.pool.size() > 0) {
            //get from the pool
            this.createBulletNode = this.pool.get();
        } else {
            //build a new one
            this.createBulletNode = instantiate(this.greenBullet);
            // this.createBulletNode.setPosition(this.node.position.x,this.node.position.y)
        }
        this.createBulletNode.setPosition(this.node.position.x,this.node.position.y)
        this.node.parent.addChild(this.createBulletNode);        
      }
    reset() {
        //clear pool and reinitialize
        this.createBulletNode.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
    destroyPlayerBullets(){
        // this.prefabBullet.destroy();
        this.createBulletNode.destroy();
    }
    //__________________________________________________________________________________________________________

      onLoad() {  
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const canWas = canvas.getComponent(UITransform)
        if (canWas) {
            this.canvasHeight = canWas.height;
        } else {
            console.error("Canvas node not found.");
        }  
        input.on(Input.EventType.KEY_DOWN,this.moveJet.bind(this));
        input.on(Input.EventType.KEY_UP, this.stopJet.bind(this));
        input.on(Input.EventType.KEY_DOWN, this.shotBullet.bind(this));
        input.on(Input.EventType.KEY_UP, this.stopShotBullet.bind(this));
        this.node.parent.on('touch-start', function(event){   
        console.log('clicked')
        // if(event.getLocationX()<this.canvasWidht/2){
        //     this.moveLeft = 0;
        // }
        // if(event.getLocationX()>this.canvasWidht/2){
        //         this.moveRight = 0;
        // }
    },this)
    // this.bulletSpeedGame = this.bul.BulletSpeed 
    }
    //LIFE-CYCLE CALLBACKS
    moveJet(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.moveLeft = 1;
                console.log('step to Left');
                break;
            case KeyCode.KEY_D:
                this.moveRight = 1;
                console.log('step to Right');
                break;
        }
    }
    stopJet(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.moveLeft = 0;
                break;
                case KeyCode.KEY_D:
                this.moveRight = 0;
                break;
        }
    }
    shotBullet(event: EventKeyboard){
        switch(event.keyCode){
                case KeyCode.KEY_M:
                this.bulletShouted = true;
                break;
        }
    } 
    stopShotBullet(event: EventKeyboard){
        switch(event.keyCode){
                case KeyCode.KEY_M:
                this.bulletShouted = false;
                break;
        }
    }
    
    update(dt: number) {
        window.focus();
        if (this.moveLeft === 1) {
            const newPosition = this.node.position.add(new Vec3(-300 * dt, 0));
            this.node.setPosition(newPosition);
        }
        if (this.moveRight === 1) {
            const newPosition = this.node.position.add(new Vec3(300 * dt, 0));
            this.node.setPosition(newPosition);
        }   
        if (this.node.position.y < -this.canvasHeight / 2 || this.node.position.y > this.canvasHeight / 2) {
        // Destroy object if it's out of canvas bounds
        this.createBulletNode.destroy();
        }
        }    
    }


