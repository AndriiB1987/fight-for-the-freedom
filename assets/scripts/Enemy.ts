import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy {
        public node: Node;
        public random: number;
        public active: boolean;
        public initialPosition: Vec3;
    
        constructor(node: Node, random: number) {
            this.node = node;
            this.initialPosition = node.position.clone();
            this.random = random;
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
            // this.node.destroy();
            this.active = false;
        }
    
        // Method to destroy the enemy node
        public destroy() {
            this.node.destroy();
            this.active = false;
        }
    }
    