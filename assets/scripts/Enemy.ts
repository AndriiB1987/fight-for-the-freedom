import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy {
        public node: Node;
        public type: number;
        public active: boolean;
    
        constructor(node: Node, type: number) {
            this.node = node;
            this.type = type;
            this.active = false;
        }
    
        // Method to activate the enemy
        public activate(parentNode: Node) {
            this.node.active = true;
            this.node.setParent(parentNode); // Set the parent node
            this.active = true;
        }
    
        // Method to deactivate the enemy
        public deactivate() {
            this.node.active = false;
            this.active = false;
        }
    
        // Method to destroy the enemy node
        public destroy() {
            this.node.destroy();
            this.active = false;
        }
    }
    