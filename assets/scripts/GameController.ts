import { _decorator, Component, Label, AudioSource, AudioClip } from 'cc';
import AnimationManager from './AnimationManager';  // Import the AnimationManager
import { PersistentNode } from './PersistentNode';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AnimationManager)
    private animationManager: AnimationManager = null;  // Reference to AnimationManager

    @property(Label)
    public label: Label;

    private typingInterval: number;  // Change from NodeJS.Timeout to number
    private isTyping: boolean = false; // Flag to indicate if typing is active

    @property(AudioSource)
    public audioSource: AudioSource | null = null;

    @property(AudioClip)
    public clip: AudioClip = null!;   

    // The typing effect function defined inside the class
    typeText(fullText: string, delay: number) {
        // Clear the label properly to prevent overlapping updates
        if (this.typingInterval) {
            clearInterval(this.typingInterval); // Stop any ongoing typing effect
        }
        this.label.string = "";
        this.isTyping = true; // Set typing flag to true
    
        let currentIndex = 0;
        const length = fullText.length;

        // Define typing interval function
        this.typingInterval = setInterval(() => {
            if (currentIndex < length) {
                this.label.string += fullText[currentIndex];
                currentIndex++;
            } else {
                clearInterval(this.typingInterval);  // Stop typing when done
                this.isTyping = false; // Reset typing flag
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

                // Debugging: Log all conditions
                console.log("Checking game conditions:");
                console.log("Missiles Shouted:", PersistentNode.instance.amount.missilesShouted);
                console.log("Player Destroyed:", PersistentNode.instance.amount.playerDestroyed);
                console.log("Player Out of Canvas:", PersistentNode.instance.amount.playerOutOfCanvase);
                console.log("Enemy Planes Crashed:", PersistentNode.instance.amount.enemyPlaneCrasched);

                // Clear the label text to prepare for a new message
                if (this.typingInterval) {
                    clearInterval(this.typingInterval); // Stop any ongoing typing effect
                }
                this.label.string = "";
                this.isTyping = false; // Reset typing flag

                // Handle conditions in priority order
                if (!this.isTyping) {
                    if (PersistentNode.instance.amount.missilesShouted <= 0) {
                        console.log("Condition triggered: Out of missiles");
                        this.typeText("You lost! You have run out of missiles!", 100);
                    } else if (PersistentNode.instance.amount.playerDestroyed === true) {
                        console.log("Condition triggered: Player jet destroyed");
                        this.typeText("Your jet is destroyed!", 100);
                    } else if (PersistentNode.instance.amount.playerOutOfCanvase === true) {
                        console.log("Condition triggered: Enemy flew past");
                        this.typeText("You lost! One of the enemies flew past you...", 100);
                    } else if (PersistentNode.instance.amount.enemyPlaneCrasched >= 20) {
                        console.log("Condition triggered: All enemies destroyed");
                        this.typeText("You win! All enemies are destroyed!", 100);
                    } else {
                        console.log("No conditions triggered.");
                    }
                }
            });
        } else {
            console.error('AnimationManager is not assigned in the GameController!');
        }
    }
}
