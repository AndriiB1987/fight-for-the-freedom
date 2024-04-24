import { _decorator, Component, director, game, Node,view, PhysicsSystem, Collider2D, Contact2DType, IPhysics2DContact, find, Prefab, input, Input, instantiate, macro, Vec3, EventKeyboard, KeyCode, Canvas, UITransform, NodePool, random } from 'cc';
import { PlayersJet } from './PlayersJet';
import { Enemy } from './Enemy';
import { Results } from './Results';


const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

  @property({
    type:Results,
    tooltip: 'Enemys destroyed'
  })
  public amount:Results
  
  private canvas: Node; // Reference to the canvas node
  public enemyPrefabs: Prefab[] = []; // Reference to the enemy prefabs
  public enemyPools: Enemy[][] = []; // Pools of enemy objects for each random
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
  public enemyToDestroy0:Enemy = null;
  public enemyToDestroy1:Enemy = null;
  public enemyToDestroy2:Enemy = null;

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
  console.log("step 1  - -  INITIATE   enemyPools  ")
  // Preload enemy objects into the pools
  this.enemyPrefabs = [this.enemy0Pref,this.enemy1Pref,this.enemy2Pref]
  for (let i = 0; i < this.enemyPrefabs.length; i++) {
      const enemyPool: Enemy[] = [];
      for (let j = 0; j < 100; j++) {
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
     // Start spawning enemies
    //  this.schedule(this.spawnEnemy, 3); // Spawn an enemy every second
    //  console.log("step 1  - -  INITIATE   enemyPools  ")
    //  console.log("step 1  - -  start schedule CALL spawnEnemy()  ")
    //  console.log("step 1  - -  start schedule CALL spawnEnemy()  " + this.enemyPools[0])
    //  console.log("step 1  - -  start schedule CALL spawnEnemy()  " + this.enemyPools[1])
    //  console.log("step 1  - -  start schedule CALL spawnEnemy()  " + this.enemyPools[2])

 
}

public spawnEnemy() {
  // Randomly select an enemy random
  
  const random = Math.floor(Math.random() * this.enemyPrefabs.length);

  // Check if there's an inactive enemy of the selected random in the pool
  const inactiveEnemy = this.enemyPools[random].find(enemy => !enemy.active);

  // If there's no inactive enemy, expand the pool
  if (!inactiveEnemy) {
      const enemyNode = instantiate(this.enemyPrefabs[random]);
      const enemy = new Enemy(enemyNode, random);
      this.enemyPools[random].push(enemy);
  }

  // Activate the first inactive enemy found or the newly created enemy
  this.enemyToSpown = inactiveEnemy || this.enemyPools[random][this.enemyPools[random].length - 1];
  console.log("LENGTH - "+ this.enemyPools[random].length)
  console.log("To DETECT obj - "+ this.enemyToSpown.node.name)
  //const objName =  this.enemyObj.node.name;
  if(this.enemyToSpown.node.name =='enemy0'){
   console.log("    0  - "+ this.enemyToSpown.node.name)
   console.log("    0  - "+ this.enemyToSpown.random)
   this.enemyToDestroy0 = this.enemyToSpown
  
   this.colliderEnemy0 =  this.enemyToDestroy0.node.getComponent(Collider2D);
   this.enemyToDestroy0.activate(this.canvas);
   console.log(this.enemyToDestroy0.node.name + " ACTIVAted " )
  }
  if(this.enemyToSpown.node.name =='enemy1'){
    console.log("    1  - "+ this.enemyToSpown.node.name)
    console.log("    1  - "+ this.enemyToSpown.random)
    this.enemyToDestroy1 = this.enemyToSpown
    
    this.colliderEnemy1 = this.enemyToDestroy1.node.getComponent(Collider2D);
    this.enemyToDestroy1.activate(this.canvas);
    console.log(this.enemyToDestroy1.node.name + " ACTIVAted " )

    
   }
   if(this.enemyToSpown.node.name =='enemy2'){
    console.log("    2  - "+ this.enemyToSpown.node.name)
    console.log("    2  - "+ this.enemyToSpown.random)
    this.enemyToDestroy2 = this.enemyToSpown
    
    this.colliderEnemy2 = this.enemyToDestroy2.node.getComponent(Collider2D);
    this.enemyToDestroy2.activate(this.canvas);
    console.log(this.enemyToDestroy2.node.name+ " ACTIVAted " )
   }
  //  this.enemyToSpown.activate(this.canvas);
  //  console.log("step 2  - -  SPOWN ENEMY  -- END")
}
public onEnemyDefeated(enemy: Enemy) {
  //enemy.deactivate(this.canvas); // Deactivate the defeated enemy
  enemy.destroy(); // Destroy the enemy node
  // Handle enemy defeat logic (e.g., award points, play animations)
}
public deactivateAllEnemies() {
  for (let pool of this.enemyPools) {
      for (let enemy of pool) {
          if (enemy.active) {
              enemy.deactivate(); // Deactivate active enemies
          }
      }
  }
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
  console.log('HERE 0');
  if(this.colliderEnemy0){
       this.enemyHitSomething0 = true; 
  } 
  if (contact) {
    console.log('Contact object    0:', contact);
    // Your collision handling code here
} else {
    console.warn('Null contact object encountered.');
}
}

onBeginContactEnemy1(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  console.log('HERE 1');
  if(this.colliderEnemy1){
    this.enemyHitSomething1 = true;   
    // console.log("1 boolen - " +this.enemyHitSomething1 )  
  } 
  if (contact) {
    console.log('Contact object    1:', contact);
    // Your collision handling code here
} else {
    console.warn('Null contact object encountered.');
}
}
onBeginContactEnemy2(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  console.log('HERE 2');
  if(this.colliderEnemy2){
  this.enemyHitSomething2 = true;  
  } 
  if (contact) {
    console.log('Contact object     2:', contact);
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

        this.enemyToDestroy0.deactivate()
        // this.enemyToDestroy0.destroy()
        
        // this.onEnemyDefeated(this.enemyToDestroy0)

        this.amount.addScore()
        this.spawnEnemy()


        this.destroyPlayersBullet()

        this.enemyHitSomething0 = false;

      }
      if (this.enemyHitSomething1 == true)
        {
          console.log("1                    <<<<    Enemy 1 Should be destroyed >>>>>")

          this.enemyToDestroy1.deactivate()
          // this.onEnemyDefeated(this.enemyToDestroy1)
          this.amount.addScore()
          this.spawnEnemy()
       
          this.destroyPlayersBullet()
          this.enemyHitSomething1 = false;
          
        }  
        if (this.enemyHitSomething2 == true)
          {
            console.log("2                    <<<<    Enemy 2 Should be destroyed >>>>>")
            
            
            this.enemyToDestroy2.deactivate()
            
            // this.onEnemyDefeated(this.enemyToDestroy2)
            this.amount.addScore()
            this.spawnEnemy()
            this.destroyPlayersBullet()
            this.enemyHitSomething2 = false;
          }         
    }

start() {
  this.spawnEnemy()
  this.contactEnemy();
   // Start spawning enemies
  //  this.schedule(this.spawnEnemy, 3); // Spawn an enemy every second
  console.log("  2                   /start()/ ");
  console.log("  2     CALL      contactEnemy() ");
}
onLoad() {
this.deactivateAllEnemies()
  console.log("  1                   /onLoad()/ ");
  this.initEnemy()
  this.canvas = find('Canvas'); // Find the canvas node
  this.amount.updateScore(0)
    }

update(dt){
  // .console.log("  3                   /update()/ ");
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




