import { _decorator, Component, director, game, Node,view, PhysicsSystem, Collider2D, Contact2DType, IPhysics2DContact, find, Prefab, input, Input, instantiate, macro, Vec3, EventKeyboard, KeyCode, Canvas, UITransform, NodePool, random } from 'cc';
import { PlayersJet } from './PlayersJet';
import { Enemy } from './Enemy';


const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private canvas: Node; // Reference to the canvas node
  public enemyPrefabs: Prefab[] = []; // Reference to the enemy prefabs
  public enemyPools: Enemy[][] = []; // Pools of enemy objects for each type
  public enemyObj:Enemy = null; 
  @property(Prefab)
  enemy0Pref:Prefab = null;
  @property(Prefab)
  enemy1Pref:Prefab = null;
  @property(Prefab)
  enemy2Pref:Prefab = null;

  public createEnemy0:Node = null;  
  public createEnemy1:Node = null;  
  public createEnemy2:Node = null;

  public enemyObjStart:Node = null;
  public poolShipsNew:Node = null;
  
  public enemyToSpown:Enemy = null;

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

destroyPlayersBullet(){
  this.jet.destroyPlayerBullets();
  // this.bulletQueue.destroyPlayerBullets();
}


initEnemy() {
  // Preload enemy objects into the pools
  this.enemyPrefabs = [this.enemy0Pref,this.enemy1Pref,this.enemy2Pref]
  for (let i = 0; i < this.enemyPrefabs.length; i++) {
      const enemyPool: Enemy[] = [];
      for (let j = 0; j < 10; j++) {
        this.enemyObjStart = instantiate(this.enemyPrefabs[i]);
          this.enemyObj = new Enemy(this.enemyObjStart, i);
          enemyPool.push(this.enemyObj);
      }
    //  console.log("To DETECT obj - "+ this.enemyObj.node.name)
    //  //const objName =  this.enemyObj.node.name;
    //  if(this.enemyObj.node.name =='enemy0'){
    //   console.log("    0  - "+ this.enemyObj.node.name)
    //   console.log("    0  - "+ this.enemyObjStart.name)
    //   this.colliderEnemy0 = this.enemyObjStart.getComponent(Collider2D);
    //  }
    //  if(this.enemyObj.node.name =='enemy1'){
    //   console.log("    1  - "+ this.enemyObj.node.name)
    //   this.colliderEnemy1 = this.enemyObjStart.getComponent(Collider2D);
    //  }
    //  if(this.enemyObj.node.name =='enemy2'){
    //   console.log("    2  - "+ this.enemyObj.node.name)
    //   this.colliderEnemy2 = this.enemyObjStart.getComponent(Collider2D);
    //  }
      this.enemyPools.push(enemyPool);
  }

 
}

public spawnEnemy() {
  // Randomly select an enemy type
  const type = Math.floor(Math.random() * this.enemyPrefabs.length);

  // Check if there's an inactive enemy of the selected type in the pool
  const inactiveEnemy = this.enemyPools[type].find(enemy => !enemy.active);

  // If there's no inactive enemy, expand the pool
  if (!inactiveEnemy) {
      const enemyNode = instantiate(this.enemyPrefabs[type]);
      const enemy = new Enemy(enemyNode, type);
      this.enemyPools[type].push(enemy);
  }

  // Activate the first inactive enemy found or the newly created enemy
  this.enemyToSpown = inactiveEnemy || this.enemyPools[type][this.enemyPools[type].length - 1];
  console.log("To DETECT obj - "+ this.enemyObj.node.name)
  //const objName =  this.enemyObj.node.name;
  if(this.enemyToSpown.node.name =='enemy0'){
   console.log("    0  - "+ this.enemyToSpown.node.name)
   console.log("    0  - "+ this.enemyToSpown.type)
   this.colliderEnemy0 = this.enemyToSpown.node.getComponent(Collider2D);
  }
  if(this.enemyToSpown.node.name =='enemy1'){
    console.log("    1  - "+ this.enemyToSpown.node.name)
    console.log("    1  - "+ this.enemyToSpown.type)
    this.colliderEnemy1 = this.enemyToSpown.node.getComponent(Collider2D);
   }
   if(this.enemyToSpown.node.name =='enemy2'){
    console.log("    2  - "+ this.enemyToSpown.node.name)
    console.log("    2  - "+ this.enemyToSpown.type)
    this.colliderEnemy2 = this.enemyToSpown.node.getComponent(Collider2D);
   }
   this.enemyToSpown.activate(this.canvas);
}
public onEnemyDefeated(enemy: Enemy) {
  enemy.deactivate(); // Deactivate the defeated enemy
  enemy.destroy(); // Destroy the enemy node
  // Handle enemy defeat logic (e.g., award points, play animations)
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
  if (contact) {
    console.log('Contact object:', contact);
    // Your collision handling code here
} else {
    console.warn('Null contact object encountered.');
}
}

onBeginContactEnemy1(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy1){
    this.enemyHitSomething1 = true;   
    // console.log("1 boolen - " +this.enemyHitSomething1 )  
  } 
  if (contact) {
    console.log('Contact object:', contact);
    // Your collision handling code here
} else {
    console.warn('Null contact object encountered.');
}
}
onBeginContactEnemy2(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy2){
  this.enemyHitSomething2 = true;  
  } 
  if (contact) {
    console.log('Contact object:', contact);
    // Your collision handling code here
} else {
    console.warn('Null contact object encountered.');
}
}
enemyStruck() {
  this.contactEnemy();
      if (this.enemyHitSomething0 == true)
      {
        console.log("0                    <<<<    Enemy 0 Should be destroyed >>>>>")

        // this.createEnemyNode.destroy()
        // this.createEnemy0.destroy();
        // this.createEnemy0.parent.removeChild(this.createEnemy0);
        this.onEnemyDefeated(this.enemyToSpown)

        this.destroyPlayersBullet()
        // this.spawnShips();
        this.enemyHitSomething0 = false;

      }
      if (this.enemyHitSomething1 == true)
        {
          console.log("1                    <<<<    Enemy 1 Should be destroyed >>>>>")
          // this.createEnemy1.destroy();
          this.onEnemyDefeated(this.enemyToSpown)
          // this.createEnemyNode.destroy()
          this.destroyPlayersBullet()
          // this.spawnShips();
          this.enemyHitSomething1 = false;
          
        }  
        if (this.enemyHitSomething2 == true)
          {
            console.log("2                    <<<<    Enemy 2 Should be destroyed >>>>>")
            // this.createEnemy2.destroy()
            this.onEnemyDefeated(this.enemyToSpown)
            // this.createEnemyNode.destroy()
            this.destroyPlayersBullet()
            // this.spawnShips();
            this.enemyHitSomething2 = false;
          }         
    }

start() {
  this.contactEnemy();
   // Start spawning enemies
   this.schedule(this.spawnEnemy, 3); // Spawn an enemy every second
  console.log("  2                   /start()/ ");
}
onLoad() {
  console.log("  1                   /onLoad()/ ");
  this.initEnemy()
  this.canvas = find('Canvas'); // Find the canvas node
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
    }
}




