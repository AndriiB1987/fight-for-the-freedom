
import { _decorator, Component, director, Animation,  EventHandler } from 'cc';

const { ccclass, property } = _decorator;
import { playAnimationWithCallback } from './CocosAnimManag';
@ccclass('Dialog')
export class Dialog extends Component {
    @property(Animation)
    info: Animation | null = null;

    onLoad () {
        if (!this.info) {
            // Try to get the AudioSource component attached to the same node
            this.info = this.getComponent(Animation);
        }
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'Dialog';
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';
    }

    showDialog (event: Event, customEventData: string) {
        playAnimationWithCallback("info_dialog", this.info,() => {
            director.pause();
        });
    }
   releseGame(){
    
    playAnimationWithCallback("info_dialog_hide", this.info,() => {

    });
    director.resume();
   }

}