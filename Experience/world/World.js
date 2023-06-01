import * as THREE from 'three';
import Experience from '../Experience';
import Diorama from './Diorama';
import Environment from './Environment';
import Controls from './Controls';
import Background from './Background';
import { EventEmitter } from 'events';

export default class World extends EventEmitter {

    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;


        this.resources.on('ready', () => {
            this.environment = new Environment();
            this.background = new Background();
            this.diorama = new Diorama();
            // this.controls = new Controls();
            this.emit("worldReady");
            
            console.log("diorama created");
        })

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);

        })
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }

    resize() {

    }

    update() {
        if (this.diorama) {
            this.diorama.update();
        }

        if (this.controls) {
            this.controls.update();
        }
    }

}