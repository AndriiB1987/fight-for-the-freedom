import { _decorator, Component, Node, view, UITransform, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DynamicLayout')
export class DynamicLayout extends Component {
    @property(Node)
    topPanel: Node = null;

    @property(Node)
    bottomPanel: Node = null;

    @property(Node)
    background: Node = null;

    onLoad() {
        this.adjustLayout();
        view.on('canvas-resize', this.adjustLayout, this);
    }

    adjustLayout() {
        const visibleSize = view.getVisibleSize();
        const aspectRatio = visibleSize.width / visibleSize.height;
        const topTransform = this.topPanel.getComponent(UITransform);
        const bottomTransform = this.bottomPanel.getComponent(UITransform);
        const backgroundTransform = this.background.getComponent(UITransform);

        // Set the width based on aspect ratio
        if (aspectRatio > 1.5) { // Example condition for wide screens
            topTransform.width = visibleSize.width * 0.8;
            bottomTransform.width = visibleSize.width * 0.8;
        } else { // Example condition for narrow screens
            topTransform.width = visibleSize.width * 0.95;
            bottomTransform.width = visibleSize.width * 0.95;
        }

        // Position the panels
        this.topPanel.setPosition(0, visibleSize.height / 2 - topTransform.height / 2, 0);
        this.bottomPanel.setPosition(0, -visibleSize.height / 2 + bottomTransform.height / 2, 0);

        // Adjust the background size
        backgroundTransform.width = visibleSize.width;
        backgroundTransform.height = visibleSize.height;
    }
}
