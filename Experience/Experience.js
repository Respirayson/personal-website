import * as THREE from 'three';
import Sizes from './utils/Sizes.js';
import Time from './utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './world/World.js';
import Resources from './utils/Resources.js';
import assets from './utils/assets.js';
import Theme from './Theme.js';
import Preloader from './Preloader.js';
import Controls from './world/Controls.js';

export default class Experience {
    static instance;
    constructor(canvas) {
        
        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;
        
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme(); 

        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on('enablecontrols', () => {
            this.controls = new Controls();
        })

        this.time.on('update', () => {
            this.update();
        })

        this.sizes.on('resize', () => {
            this.resize();
        })

    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();

    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
        this.world.resize()
        this.preloader.update();
    }
}