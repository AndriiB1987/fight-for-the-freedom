
import { _decorator, Component, AudioClip, AudioSource, Slider, Label, Toggle, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioControl')
export class AudioControl extends Component {

    @property(AudioClip)
    clip: AudioClip = null!;

    @property(AudioSource)
    source1: AudioSource = null!;

    @property(Label)
    eventLabel1: Label = null!;
    
    @property(AudioSource)
    source2: AudioSource = null!;

    @property(Label)
    eventLabel2: Label = null!;


    onEnable () {
        console.log('AudioSource1 loadMode: ', this.source1.clip?.loadMode);
        console.log('AudioSource2 loadMode: ', this.source2.clip?.loadMode);
        this.source1.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source1.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
        this.source2.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source2.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
    }

    onDisable () {
        this.source1.node.off(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source1.node.off(AudioSource.EventType.ENDED, this.onEnded, this);
        this.source2.node.off(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source2.node.off(AudioSource.EventType.ENDED, this.onEnded, this);
    }
    
    playOneShot1 () {
        this.source1.playOneShot(this.clip);
    }

    playOneShot2 () {
        this.source2.playOneShot(this.clip);
    }


    onStarted (audioSource: AudioSource) {
        let eventLabel = audioSource === this.source1 ? this.eventLabel1 : this.eventLabel2;
        this.showEventLabel(eventLabel, 'STARTED', 1);
    }

    onEnded (audioSource: AudioSource) {
        let eventLabel = audioSource === this.source1 ? this.eventLabel1 : this.eventLabel2;
        this.showEventLabel(eventLabel, 'ENDED', 1);
    }

    showEventLabel (eventLabel: Label, text: string, timeInSeconds: number) {
        eventLabel.string = text;
        eventLabel.node.active = true;
        this.scheduleOnce(() => {
            eventLabel.node.active = false;
        }, timeInSeconds);
    }
}