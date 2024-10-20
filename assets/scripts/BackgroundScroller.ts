import { _decorator, Component, Node, Vec3,UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundScroller')
export class BackgroundScroller extends Component {
    @property(Node)
    background1: Node = null!; // First background node
    
    @property(Node)
    background2: Node = null!; // Second background node
    
    @property
    scrollSpeed: number = 35; // Adjust this to control the speed of the scroll

    private backgroundHeight: number = 0; // The height of one background image

    start() {
        // Assuming both backgrounds have the same height, get the height of one background
        this.backgroundHeight = this.background1.getComponent(UITransform).height;
        this.background1.setSiblingIndex(0);
        this.background2.setSiblingIndex(0);
    }

    update(deltaTime: number) {
        // Move both background nodes downward
        this.scrollBackground(this.background1, deltaTime);
        this.scrollBackground(this.background2, deltaTime);
        
        // Check if the background has moved off the screen and reposition it to create the loop
        this.checkAndReposition(this.background1);
        this.checkAndReposition(this.background2);
    }

    scrollBackground(background: Node, deltaTime: number) {
        // Scroll the background downward at the specified speed
        background.setPosition(background.position.x, background.position.y - this.scrollSpeed * deltaTime, background.position.z);
    }

    checkAndReposition(background: Node) {
        // If the background has moved completely off the screen, reposition it to the top
        if (background.position.y <= -this.backgroundHeight) {
            background.setPosition(new Vec3(background.position.x, this.backgroundHeight, background.position.z));
        }
    }
}
