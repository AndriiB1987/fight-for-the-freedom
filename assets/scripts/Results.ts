import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PersistentNode } from './PersistentNode';

@ccclass('Results')
export class Results extends Component {
    @property({
        type:Label

    })
    public countingLabel:Label;

    @property({
        type:Label

    })
    public totalEnemysLabel:Label;

    @property({
        type:Label

    })
    public missilesLabel:Label;

    count: number=0;
    countOfTotalEnemy: number=20;
    countOfTotalMissiles: number=23
    missilesShouted:number;
    enemyPlaneCrasched:number=0;
    // commonLabale:Label;
    updateScore( comLab:Label,num:number,){
        this.count = num
        // this.commonLabale =comLab
        comLab.string = (' ' + this.count)

        // console.log("added +1 destroyed enemy")
    }

    resetScores(){
     this.updateScore(this.totalEnemysLabel,0)
     this.updateScore(this.countingLabel,0)
     this.updateScore(this.missilesLabel,0)
     this.enemyPlaneCrasched = 0;
     PersistentNode.instance.amount.enemyPlaneCrasched =0;
     PersistentNode.instance.amount.missilesShouted =23;
     PersistentNode.instance.amount.playerDestroyed = false;
     PersistentNode.instance.amount.playerOutOfCanvase = false;

    }
    addScoreDestroyedEnemy(){
        this.updateScore(this.countingLabel, this.count+1)
        this.enemyPlaneCrasched =this.enemyPlaneCrasched+1; 
    }

    scoreTotalEnemy(){
        this.countOfTotalEnemy = this.countOfTotalEnemy -1
        this.totalEnemysLabel.string  =''+this.countOfTotalEnemy

    }

    scoreTotalMissiles(){
        this.countOfTotalMissiles = this.countOfTotalMissiles-1
        this.missilesLabel.string  =''+this.countOfTotalMissiles
    }
    // showResult(){}
    onLoad(){
        this.totalEnemysLabel.string  =''+this.countOfTotalEnemy
        this.missilesLabel.string  =''+this.countOfTotalMissiles
    }

    update(){
        this.missilesShouted = this.countOfTotalMissiles;
    }
}


