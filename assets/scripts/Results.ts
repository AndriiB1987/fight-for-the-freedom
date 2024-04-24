import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type:Label

    })
    public countingLabel:Label;

    countingEnemys: number;
    updateScore(num:number){
        this.countingEnemys = num
        this.countingLabel.string = (' ' + this.countingEnemys)
        console.log("added +1 destroyed enemy")
    }

    resetScore(){
    this.updateScore(0)

    }
    addScore(){
        this.updateScore(this.countingEnemys+1)
        
    }
    // showResult(){}
}


