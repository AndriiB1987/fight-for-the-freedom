import { _decorator, Component } from 'cc';
import  AnimationManager  from './AnimationManager';  // Import the AnimationManager

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AnimationManager)
    private animationManager: AnimationManager = null;  // Reference to AnimationManager

    start() {
        // Check if animationManager is assigned
        if (this.animationManager) {
            // Trigger 'show' animation, then switch to 'idle' when complete
            this.animationManager.playSpineAnimation('show', false, () => {
                console.log('Show animation completed, triggering idle animation...');
                // Play 'idle' animation after 'show' finishes
                this.animationManager.playSpineAnimation('idle', true);
            });
        } else {
            console.error('AnimationManager is not assigned in the GameController!');
        }
    }
}