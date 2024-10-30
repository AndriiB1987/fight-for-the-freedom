import {  _decorator, Component, Event, Node, Button, EventHandler,director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwitchScene')
export class switchScene extends Component {

    onLoad () {
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
        // this.jet.reset();
    }

    update(dt) {
        
    }
}


