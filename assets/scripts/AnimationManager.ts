import { _decorator, CCClass, Component, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass('SpinePopup')
export default class SpinePopup extends Component{

    mixTime:number= 0.2;

    private spine?: sp.Skeleton;
    private _hasStop = true;
    onLoad () {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;

        spine.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        spine.setInterruptListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        spine.setEndListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
        spine.setDisposeListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        spine.setCompleteListener((trackEntry) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if (animationName === 'show') {
                this.spine!.clearTrack(1);
            }
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            console.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        spine.setEventListener(((trackEntry:any, event:any) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        }) as any);

        this._hasStop = false;
    }

    // ANIMATIONS

    show () {
        this.spine.clearTrack(0);
        this.spine.setToSetupPose();
        this.spine?.setAnimation(1, 'show', false);
    }

    idle () {
            this.spine.setToSetupPose();
            this.spine.setAnimation(0, 'idle', true);
    }
    playSpineAnimation(animationName: string, loop: boolean, callback?: () => void) {
        if (this.spine) {
            // Play the requested animation
            this.spine.setAnimation(0, animationName, loop);

            // Set complete listener to call the callback when animation finishes
            this.spine.setCompleteListener((entry: sp.spine.TrackEntry) => {
                if (callback) {
                    callback();  // Trigger the callback when the animation finishes
                }
            });
        } else {
            console.error('Spine Skeleton component is not assigned!');
        }
    }

}
