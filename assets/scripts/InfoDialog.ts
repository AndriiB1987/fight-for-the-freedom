
import { _decorator, Component, director, Animation,  EventHandler } from 'cc';

const { ccclass, property } = _decorator;
import { Game } from './Game';
@ccclass('Dialog')
export class Dialog extends Component {
    @property(Animation)
    info: Animation | null = null;

    playAnimationWithCallback(clipName: string, anim:Animation, callback: Function) {
        if (anim) {
            // Play the animation
            anim.play(clipName);
  
            // Register the callback for the 'finished' event
            anim.once(Animation.EventType.FINISHED, () => {
                callback(); // Call the provided callback function
            });
        } else {
            console.error('Animation component is missing');
        }
    }
        // Callback function that will be executed when the animation finishes
        onAnimationComplete() {
          console.log('Animation completed!');
          // Any additional logic when the animation finishes
      }
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
        this.playAnimationWithCallback("info_dialog", this.info,() => {
            director.pause();
        });
    }
   releseGame(){
    
    this.playAnimationWithCallback("info_dialog_hide", this.info,() => {

    });
    director.resume();
   }

}