import { _decorator,Animation, Component, macro, Node, Vec3, director, EventKeyboard, Scene, Prefab, instantiate, Label,KeyCode, Input, input, Collider2D, Contact2DType, IPhysics2DContact, NodePool, UITransform, Canvas,screen, AudioSource, AudioClip  } from 'cc';
import { Game } from './Game';
import { AudioControl } from './AudioController';
import { playAnimationWithCallback } from './CocosAnimManag';
const { ccclass, property } = _decorator;
@ccclass('PlayersJet')
export class PlayersJet extends Component {
    @property(AudioSource)
    public audioSource: AudioSource | null = null;
    @property(AudioClip)
    public clip: AudioClip = null!   
    public sound: AudioControl = null;  // Drag and drop your AudioSource in the inspector
    public scene = screen.windowSize;
    moveLeft:number =0;
    moveRight:number =0;
    @property(Prefab)
    greenBullet:Prefab = null;
    bulletShouted:boolean = false;
    public playersBullet:Node = null; 
    public playersBulletNew:Node; 
    public game:Game = null; 
    public hitSomething:boolean;
    public hitGreenBullet:boolean;
    @property(Animation)
    private animStatic: Animation | null = null;

    @property(Animation)
    private animRight: Animation | null = null;

    @property(Animation)
    private animLeft: Animation | null = null;
    public pool = new NodePool;
    public createBulletNode:Node = null;  
    public canvasWidht:number;

    getCanvaSize(){
        this.canvasWidht = this.node.parent.getComponent(UITransform).contentSize.width;
    }
    start() {

        this.getCanvaSize();
        console.log("!!!!!! canvs in PLayerS  - "+ this.canvasWidht)
      }
    initPool(){
        let initCount = 150;
        for (let i = 0; i < initCount; i++) {

            let createBullet = instantiate(this.greenBullet);
   
            if (i == 0) {
                this.node.parent.addChild(createBullet);
            } else {
                this.pool.put(createBullet);
            }
        }
    }
    addPool() {
        if (this.pool.size() > 0) {
            this.createBulletNode = this.pool.get();
        } else {
            this.createBulletNode = instantiate(this.greenBullet);
        }
        this.createBulletNode.setPosition(this.node.position.x,this.node.position.y)
        this.node.parent.addChild(this.createBulletNode);
        this.createBulletNode.setSiblingIndex(2);
      }
    reset() {
        this.createBulletNode.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
    destroyPlayerBullets(){
        this.createBulletNode.destroy();
    }

      onLoad() { 
        if (!this.animStatic || !this.animRight || !this.animLeft) {
            console.error('One or more Animation components are missing or not assigned in the editor');
        }
        if (!this.audioSource) {
            // Try to get the AudioSource component attached to the same node
            this.audioSource = this.getComponent(AudioSource);
        }
        if (!this.audioSource) {
            console.error('AudioSource component is missing or not assigned');
        } 
        input.on(Input.EventType.KEY_DOWN,this.moveJet.bind(this));
        input.on(Input.EventType.KEY_UP, this.stopJet.bind(this));
        input.on(Input.EventType.KEY_DOWN, this.shotBullet.bind(this));
        input.on(Input.EventType.KEY_UP, this.stopShotBullet.bind(this));
        this.node.parent.on('touch-start', function(event){   
        console.log('clicked')
    },this)
    // this.bulletSpeedGame = this.bul.BulletSpeed 
    }
    //LIFE-CYCLE CALLBACKS
    moveJet(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.moveLeft = 1;
                playAnimationWithCallback('anim_OfPlayerLeft', this.animLeft, () => {
                    // this.audioSourceEnemyExpl.play();
                
                  });
                break;
            case KeyCode.KEY_D:
                this.moveRight = 1;
                playAnimationWithCallback('anim_OfPlayerRight', this.animRight, () => {
                    // this.audioSourceEnemyExpl.play();
                
                  });
                break;
        }
    }
    stopJet(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.moveLeft = 0;
                playAnimationWithCallback('anim_OfPlayerStatic', this.animStatic, () => {
                    // this.audioSourceEnemyExpl.play();
                
                  });
                break;
                case KeyCode.KEY_D:
                this.moveRight = 0;
                playAnimationWithCallback('anim_OfPlayerStatic', this.animStatic, () => {
                    // this.audioSourceEnemyExpl.play();
                
                  });
                break;
        }
    }
    shotBullet(event: EventKeyboard){
        switch(event.keyCode){
                case KeyCode.KEY_M:
                this.bulletShouted = true;
                if (this.audioSource) {
                    this.audioSource.playOneShot(this.clip, 1);
                } else {
                    console.error('AudioSource is not assigned!');
                }

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
        }    
    }


