import { Animation } from 'cc';

/**
 * Plays an animation clip and executes a callback function when it finishes.
 * @param clipName The name of the animation clip to play.
 * @param anim The Animation component.
 * @param callback The callback function to execute when the animation finishes.
 */
export function playAnimationWithCallback(clipName: string, anim: Animation, callback: () => void): void {
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
