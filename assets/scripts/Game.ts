import { _decorator, Component, director, game, Node,view, PhysicsSystem, Collider2D, Contact2DType, IPhysics2DContact, find, Prefab, input, Input, instantiate, macro, Vec3, EventKeyboard, KeyCode, Canvas, UITransform, NodePool, random } from 'cc';
import { PlayersJet } from './PlayersJet';
import { MoveBullet } from './MoveBullet';


const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private canvas: HTMLCanvasElement | null;

  @property(Prefab)
  enemy0Pref:Prefab = null;
  @property(Prefab)
  enemy1Pref:Prefab = null;
  @property(Prefab)
  enemy2Pref:Prefab = null;

  public createEnemy0:Node = null;  
  public createEnemy1:Node = null;  
  public createEnemy2:Node = null;

  public poolShips:Node = null;
  public poolShipsNew:Node = null;

  public colliderEnemy0:Collider2D;
  public colliderEnemy1:Collider2D;
  public colliderEnemy2:Collider2D;

  public enemyHitSomething0:boolean;
  public enemyHitSomething1:boolean;
  public enemyHitSomething2:boolean;
  public ranX:number;
  @property({
      type: PlayersJet,
      tooltip: "Add jet",
    })
  public jet: PlayersJet;

  // public bulletSpeedGame:number = null;
  // public bul: MoveBullet;

  public isOver: boolean;
  public isButtonPressed: boolean = false;
  public poolOfEnemy = new NodePool;
  public createEnemyNode:Node = null;  
  public apearEnemyFrequency:number = 3.0;

createPlayersBullet(){
  this.jet.addPool()
  // this.bulletQueue.addPool();
}

// createEnemys(){
//   this.addPoolOfEnemy()
//   // this.bulletQueue.addPool();
// }
destroyPlayersBullet(){
  this.jet.destroyPlayerBullets();
  // this.bulletQueue.destroyPlayerBullets();
}

initPoolOfEnemy(){

  let initCount = 3;

  //fill up the node pool
  let poolShips = [this.createEnemy0,this.createEnemy1,this.createEnemy2]
  let random = Math.floor(Math.random()*poolShips.length)
  
  for (let i = 0; i < initCount; i++) {
      // create the new node
      this.poolShipsNew = poolShips[random]
      if (i == 0) {
          this.node.parent.addChild(this.poolShipsNew);
      } else {
          //put others into the nodePool
          this.poolOfEnemy.put(this.poolShipsNew);
      }
  }
  // let dd = this.poolOfEnemy.get()
  // console.log(" elm 0 -" + dd)
}

addPoolOfEnemy() {
  // let ships = [this.createEnemy0,this.createEnemy1,this.createEnemy2]
  // let random = Math.floor(Math.random()*ships.length)
  // let newShip = ships[random]
  //if the pool is not full add a new one, else get the first one in the pool
  if (this.poolOfEnemy.size() > 0) {
      //get from the pool
      // this.createEnemyNode = this.poolOfEnemy.get();
      this.createEnemyNode = this.poolOfEnemy.get();
  } else {
      //build a new one
      this.createEnemyNode = this.poolShipsNew;
  }
  //this.createEnemyNode.setPosition(this.node.position.x,this.node.position.y)
  this.node.parent.addChild(this.createEnemyNode);
  console.log(" NODE   -- -- -- " + this.createEnemyNode)     
}
randomValue(){
  const uiTransform = 1700;
  let randomX = Math.random() * uiTransform;
  this.ranX = randomX;
}
initAllForStart(){  
  this.createEnemy0 = instantiate(this.enemy0Pref)
  this.createEnemy1 = instantiate(this.enemy1Pref)
  this.createEnemy2 = instantiate(this.enemy2Pref)
  this.colliderEnemy0 = this.createEnemy0.getComponent(Collider2D);
  this.colliderEnemy1 = this.createEnemy1.getComponent(Collider2D);
  this.colliderEnemy2 = this.createEnemy2.getComponent(Collider2D);

}
spawnShips(numShips: number, jetXCoordinate:number){
  let ships = [this.createEnemy0,this.createEnemy1,this.createEnemy2]
  for (let i = 0; i < numShips; i++) {
    let random = Math.floor(Math.random()*ships.length)
    let newShip =ships[random]
     newShip.setPosition(jetXCoordinate-900,1800)
    this.node.parent.addChild(newShip)
  }
    //  this.addPoolOfEnemy()
    console.log("Enemy  Created with arr")
    }

    contactEnemy() {
      console.log("    <<<<     contact  ENEMY  for ALL>>>>>   ")
         if(this.colliderEnemy0){
          this.colliderEnemy0.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy0, this);
         }
         if(this.colliderEnemy1){
          this.colliderEnemy1.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy1, this);
         }
         if( this.colliderEnemy2){
          this.colliderEnemy2.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy2, this);
         }
      }
onBeginContactEnemy0(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy0){
       this.enemyHitSomething0 = true; 
  } 
}

// onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
//   // will be called once when the contact between two colliders just about to end.
//   console.log('onEndContact');
// }

onBeginContactEnemy1(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy1){
    this.enemyHitSomething1 = true;   
    // console.log("1 boolen - " +this.enemyHitSomething1 )  
  } 
}
onBeginContactEnemy2(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy2){
  this.enemyHitSomething2 = true;  
  } 
}
enemyStruck() {
      if (this.enemyHitSomething0 == true)
      {
        console.log("0                    <<<<    Enemy 0 Should be destroyed >>>>>")

        // this.createEnemyNode.destroy()
        // this.createEnemy0.destroy();
        this.createEnemy0.parent.removeChild(this.createEnemy0);

        this.destroyPlayersBullet()
        this.randomValue()
        this.spawnShips(1, this.ranX);
        this.enemyHitSomething0 = false;

      }
      if (this.enemyHitSomething1 == true)
        {
          console.log("1                    <<<<    Enemy 1 Should be destroyed >>>>>")
          // this.createEnemy1.destroy();
          this.createEnemy1.parent.removeChild(this.createEnemy1);
          // this.createEnemyNode.destroy()
          this.destroyPlayersBullet()
          this.randomValue()
          this.spawnShips(1, this.ranX);
          this.enemyHitSomething1 = false;
          
        }  
        if (this.enemyHitSomething2 == true)
          {
            console.log("2                    <<<<    Enemy 2 Should be destroyed >>>>>")
            // this.createEnemy2.destroy()
            this.createEnemy2.parent.removeChild(this.createEnemy2);
            // this.createEnemyNode.destroy()
            this.destroyPlayersBullet()
            this.randomValue()
            this.spawnShips(1, this.ranX);
            this.enemyHitSomething2 = false;
          }         
    }

start() {

  this.contactEnemy();
  this.randomValue()
  this.spawnShips(2, this.ranX);

  console.log("Script started by /start()/ ");
}
onLoad() {
  
  // /this.jet.initPool()
  
  this.initAllForStart()
  // this.schedule(this.spawnShips(1, this.ranX), this.apearEnemyFrequency, macro.REPEAT_FOREVER, 3.0);
  //this.initPoolOfEnemy()
  // this.bulletSpeedGame = this.bul.BulletSpeed


  console.log("onLoad was passed by /onLoad()/ ");

    }
    destroyBylletIfOutOfCanvas(){

    }
update(dt){
  if (this.jet.bulletShouted === true && this.isButtonPressed === false) {      
          this.createPlayersBullet();
          this.isButtonPressed = true;
        } else if (this.jet.bulletShouted === false) {
          // Reset the button press state when the button is released
          this.isButtonPressed = false;
      }
      this.enemyStruck()
      // this.schedule(this.spawnShips, 3);
      // const scene = director.getScene();
      // const canvas = scene.getComponentInChildren(Canvas);
      // const currentPosition = this.node.position;
      // const newY = currentPosition.y - (this.bulletSpeedGame * dt);
      // this.node.setPosition(this.node.position.x,newY);   
      // if(this.node.position.y <= -(canvas.getComponent(UITransform).height)){
      //   this.destroyPlayersBullet()
      // }
    }
}




