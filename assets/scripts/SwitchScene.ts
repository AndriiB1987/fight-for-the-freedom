import {  _decorator, Component, Event, Node, Button, EventHandler,director, game,AudioSource,AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwitchScene')
export class switchScene extends Component {
    @property(AudioSource)
    public audioSourceSoundBg: AudioSource | null = null;
    @property(AudioClip)
    public clip: AudioClip = null!   
    // onShoot() {
    //     if (this.audioSourceSoundBg) {
    //         this.audioSourceSoundBg.playOneShot(this.clip, 1);
    //     } else {
    //         console.error('AudioSource is not assigned!');
    //     }
    // }
    onLoad () {
        // if (!this.audioSourceSoundBg) {
        //     // Try to get the AudioSource component attached to the same node
        //     this.audioSourceSoundBg = this.getComponent(AudioSource);
        // }
        // if (!this.audioSourceSoundBg) {
        //     console.error('AudioSource component is missing or not assigned');
        // } 
        
        const clickEventHandler = new EventHandler();
        // This node is the node to which your event handler code component belongs
        clickEventHandler.target = this.node;
        // This is the script class name
        clickEventHandler.component = 'example';
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';

        // const button = this.node.getComponent(Button);
        // button.clickEvents.push(clickEventHandler);

        // document.addEventListener('click', this.onInteraction.bind(this));
        // document.addEventListener('keydown', this.onInteraction.bind(this));

        
        
        director.preloadScene('Game');
    }

    callback (event: Event, customEventData: string) {
        // The event here is a Touch object, and you can get the send node of the event by event.target
       // const node = event.target as Node;
        //const button = node.getComponent(Button);
       // console.log(customEventData); // foobar
        
        
        director.loadScene('Game');
        director.resume();
    }


    start() {
        // this.node.on(Node.EventType.TOUCH_START, this.onShoot, this);
        // this.node.on(Node.EventType.TOUCH_END, this.onStopShoot, this);
    }
    // onStopShoot() {
    //     // this.bulletShouted = false;
    // }
    update(dt) {
        
    }
}


