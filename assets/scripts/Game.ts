import { _decorator, Component, director, AudioSource, Node,Animation, Collider2D, Contact2DType, IPhysics2DContact,Prefab, instantiate, NodePool} from 'cc';
import { PlayersJet } from './PlayersJet';
import { Results } from './Results';
import {switchScene} from "./SwitchScenePopupToMenu";
import { PersistentNode } from './PersistentNode';
import { playAnimationWithCallback } from './CocosAnimManag';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  @property(AudioSource)
  public audioSourceEnemyExpl: AudioSource | null = null;
  @property(AudioSource)
  public audioSourcePlayerExpl: AudioSource | null = null;
  
  @property(Animation)
  cocosAnim_0: Animation | null = null;
  @property(Animation)
  cocosAnim_1: Animation | null = null;
  @property(Animation)
  cocosAnim_2: Animation | null = null;
  @property(Animation)
  player: Animation | null = null;

  @property({
    type:Results,
    tooltip: 'Enemys destroyed'
  })
  public amount:Results;
  public enemyPrefabs: Prefab[] = []; // Reference to the enemy prefabs
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

  public colliderEnemy0:Collider2D;
  public colliderEnemy1:Collider2D;
  public colliderEnemy2:Collider2D;
  public colliderPlayer:Collider2D;

  public enemyHitSomething0:boolean;
  public enemyHitSomething1:boolean;
  public enemyHitSomething2:boolean;
  public playerHitSomething:boolean;
  public ranX:number;
  @property({
      type: PlayersJet,
      tooltip: "Add jet",
    })
  public jet: PlayersJet;
  public isOver: boolean;
  public isButtonPressed: boolean = false;
  public poolOfEnemy = new NodePool;
  public createEnemyNode:Node = null;  
  public apearEnemyFrequency:number = 3.0;
  public amountOfMassels:number;
  public switchScene:switchScene;

createPlayersBullet(){
  this.jet.addPool()
}

destroyPlayersBullet(){
  this.jet.destroyPlayerBullets();
}

public pool = new NodePool;
public createEnemy:Node = null;  
initEnemy() {
        let initCount = 3;
        this.enemyPrefabs = [this.enemy0Pref,this.enemy1Pref,this.enemy2Pref]
        for (let i = 0; i < initCount; i++) {
            let createEnemy = instantiate(this.enemyPrefabs[i]);
            console.log('enemy NAME - '+ this.enemyPrefabs[i].name)
            this.pool.put(createEnemy);
        }
  }

public spawnEnemy(enemy:Node) {
  const random = Math.floor(Math.random() * this.enemyPrefabs.length);
        if (this.pool.size() > 0) {
          this.createEnemy = this.pool.get();
      } else {
          this.createEnemy = instantiate(enemy);
      }
      if(this.createEnemy.name =='enemy0'){
        this.createEnemy0 = this.createEnemy
        this.colliderEnemy0 = this.createEnemy0.getComponent(Collider2D);
        enemy = this.createEnemy
        this.createEnemy0.active = true
        this.node.parent.addChild(enemy);
        this.createEnemy0.setSiblingIndex(2);
       }
       if(this.createEnemy.name =='enemy1'){
        this.createEnemy1 = this.createEnemy
        this.colliderEnemy1 = this.createEnemy1.getComponent(Collider2D);
        enemy = this.createEnemy
        enemy.setSiblingIndex(3); 
        this.createEnemy1.active = true
        this.node.parent.addChild(enemy);
        this.createEnemy1.setSiblingIndex(2);
       }
       if(this.createEnemy.name =='enemy2'){
        this.createEnemy2 = this.createEnemy
        this.colliderEnemy2 = this.createEnemy2.getComponent(Collider2D);
        enemy = this.createEnemy
        this.createEnemy2.active = true
        this.node.parent.addChild(enemy);
        this.createEnemy2.setSiblingIndex(2);
       }

    }

    contactEnemy() {
         if(this.colliderEnemy0){
          this.colliderEnemy0.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy0, this);
         }
         if(this.colliderEnemy1){
          this.colliderEnemy1.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy1, this);
         }
         if( this.colliderEnemy2){
          this.colliderEnemy2.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactEnemy2, this);
         
         }
         this.colliderPlayer = this.jet.getComponent(Collider2D);
         if (this.colliderPlayer) {
          this.colliderPlayer.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactPlayer, this);

         }
      }
onBeginContactEnemy0(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
 
  const animation = this.node.getComponent(Animation);
  if(this.colliderEnemy0){
    playAnimationWithCallback('expl', this.cocosAnim_0, () => {
      this.audioSourceEnemyExpl.play();
  
    });
    this.enemyHitSomething0 = true; 
}
}

onBeginContactEnemy1(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy1){
    this.audioSourceEnemyExpl.play();
    playAnimationWithCallback('expl', this.cocosAnim_1, () => {});
    this.enemyHitSomething1 = true;   
  }
}
onBeginContactEnemy2(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderEnemy2){
    this.audioSourceEnemyExpl.play();
    playAnimationWithCallback('expl', this.cocosAnim_2, () => {});
  this.enemyHitSomething2 = true;
}

}
onBeginContactPlayer(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
  if(this.colliderPlayer){
    this.audioSourcePlayerExpl.play();
    playAnimationWithCallback('expl', this.player, () => {});
  this.playerHitSomething = true;
}}
enemyStruck() {
  this.contactEnemy();
      if (this.enemyHitSomething0 == true)
      {
          this.createEnemy0.active = false
          this.amount.addScoreDestroyedEnemy()
          this.destroyPlayersBullet()
          this.enemyHitSomething0 = false;
          this.amount.scoreTotalEnemy();
          setTimeout(() => {         
            this.createEnemy0.destroy();
            this.spawnEnemy(this.createEnemy0)
        }, 300);

      }
      if (this.enemyHitSomething1 == true)
        {
          this.createEnemy1.active = false
          this.amount.addScoreDestroyedEnemy()
          this.destroyPlayersBullet()
          this.enemyHitSomething1 = false;
          this.amount.scoreTotalEnemy();
          setTimeout(() => {
            this.createEnemy1.destroy();
            this.spawnEnemy(this.createEnemy1)
        }, 300);
        
      }  
        if (this.enemyHitSomething2 == true)
          {
            this.createEnemy2.active = false
            this.amount.addScoreDestroyedEnemy()
            this.destroyPlayersBullet()
            this.enemyHitSomething2 = false;
            this.amount.scoreTotalEnemy();
            setTimeout(() => {
              this.createEnemy2.destroy();
              this.spawnEnemy(this.createEnemy2)
          }, 300);
          }         
          if (this.playerHitSomething == true)
            {
              this.jet.node.active = false;

              setTimeout(() => {
                if (this.playerHitSomething == true){
                  PersistentNode.instance.amount.playerDestroyed = true;
                  director.loadScene('Dialog');
                }
                this.playerHitSomething = false;
            }, 300);
          }   
    }

start() {
  this.spawnEnemy(this.createEnemy0)
  this.spawnEnemy(this.createEnemy1)
  this.spawnEnemy(this.createEnemy2)
  this.contactEnemy();
}
onLoad() {
  director.preloadScene('Dialog');
  this.initEnemy()
    }

update(dt){
  if (this.jet.bulletShouted === true && this.isButtonPressed === false) {      
          this.createPlayersBullet();
          this.isButtonPressed = true;
          this.amount.scoreTotalMissiles();
        } else if (this.jet.bulletShouted === false) {
          // Reset the button press state when the button is released
          this.isButtonPressed = false;
      }
      if (this.amount.missilesShouted <= 0) {
        PersistentNode.instance.amount.missilesShouted = this.amount.missilesShouted;
        director.loadScene('Dialog');
    }
    if (this.amount.enemyPlaneCrasched >= 20) {
      PersistentNode.instance.amount.enemyPlaneCrasched = this.amount.enemyPlaneCrasched;
      setTimeout(() => {
        director.loadScene('Dialog');
    }, 300);
    }
      this.enemyStruck()
    }
  }