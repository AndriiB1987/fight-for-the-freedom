import { _decorator, Component, Label,AudioSource, AudioClip } from 'cc';
import  AnimationManager  from './AnimationManager';  // Import the AnimationManager
import { PersistentNode } from './PersistentNode';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AnimationManager)
    private animationManager: AnimationManager = null;  // Reference to AnimationManager
    @property(Label)
    public label :Label;
    private typingInterval: number;  // Change from NodeJS.Timeout to number
    @property(AudioSource)
    public audioSource: AudioSource | null = null;
    @property(AudioClip)
    public clip: AudioClip = null!   
    // The typing effect function defined inside the class
    typeText(fullText: string, delay: number) {
        this.label.string = "";  // Clear the label before typing
    
        let currentIndex = 0;
        const length = fullText.length;
    
        // Clear any previous interval
        clearInterval(this.typingInterval);
    
        // Define typing interval function
        this.typingInterval = setInterval(() => {
            if (currentIndex < length) {
                this.label.string += fullText[currentIndex];
                currentIndex++;
            } else {
                clearInterval(this.typingInterval);  // Stop typing when done
            }
        }, delay);  // Set the delay for typing
    }
    
    start() {
        // Check if animationManager is assigned
        if (this.animationManager) {
            // Trigger 'show' animation, then switch to 'idle' when complete
            
            this.animationManager.playSpineAnimation('show', false, () => {
                console.log('Show animation completed, triggering idle animation...');
                // Play 'idle' animation after 'show' finishes
                this.animationManager.playSpineAnimation('idle', true);

                if( PersistentNode.instance.amount.missilesShouted<=0){
                    this.typeText("You lost! You have run out of missiles!", 100);
                }
                if( PersistentNode.instance.amount.playerDestroyed==true){
                     this.typeText("Your jet is destroyed!", 100);
                }
                if( PersistentNode.instance.amount.playerOutOfCanvase==true){
                     this.typeText("You lost! One of the enemies flew past you...", 100);
                }

                if( PersistentNode.instance.amount.enemyPlaneCrasched>=20){
                     this.typeText("You win! All enemies are destroyed!", 100);
                }
            });
        } else {
            console.error('AnimationManager is not assigned in the GameController!');
        }
    }
    

}