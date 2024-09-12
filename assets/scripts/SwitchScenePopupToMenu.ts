import {  _decorator, Component, Event, Node, Button, EventHandler,director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwitchScenePopupToMenu')
export class switchScene extends Component {

    onLoad () {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'example';
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';
        director.preloadScene('Menu');
    }

    callback (event: Event, customEventData: string) {
        director.loadScene('Menu');
    }


    start() {
        // this.jet.reset();
    }

    update(dt) {
        
    }
}


