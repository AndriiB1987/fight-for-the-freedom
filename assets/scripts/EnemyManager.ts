import { Component, instantiate, Node, _decorator } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')

export class EnemyManager extends Component {
    public enemyPrefabs: Node[] = []; // Reference to the enemy prefabs
    private enemyPools: Enemy[][] = []; // Pools of enemy objects for each type

    start() {
        // Preload enemy objects into the pools
        for (let i = 0; i < this.enemyPrefabs.length; i++) {
            const enemyPool: Enemy[] = [];
            for (let j = 0; j < 10; j++) {
                const enemyNode = instantiate(this.enemyPrefabs[i]);
                const enemy = new Enemy(enemyNode, i);
                enemyPool.push(enemy);
            }
            this.enemyPools.push(enemyPool);
        }

        // Start spawning enemies
        this.schedule(this.spawnEnemy, 1); // Spawn an enemy every second
    }

    // Method to spawn an enemy
    private spawnEnemy() {
        // Randomly select an enemy type
        const type = Math.floor(Math.random() * this.enemyPrefabs.length);

        // Check if there's an inactive enemy of the selected type in the pool
        const inactiveEnemy = this.enemyPools[type].find(enemy => !enemy.active);

        // If there's no inactive enemy, expand the pool
        if (!inactiveEnemy) {
            const enemyNode = instantiate(this.enemyPrefabs[type]);
            const enemy = new Enemy(enemyNode, type);
            this.enemyPools[type].push(enemy);
        }

        // Activate the first inactive enemy found or the newly created enemy
        const enemyToSpawn = inactiveEnemy || this.enemyPools[type][this.enemyPools[type].length - 1];
        enemyToSpawn.activate();
    }

    // Method to handle enemy defeat
    public onEnemyDefeated(enemy: Enemy) {
        enemy.deactivate(); // Deactivate the defeated enemy
        enemy.destroy(); // Destroy the enemy node
        // Handle enemy defeat logic (e.g., award points, play animations)
    }
}