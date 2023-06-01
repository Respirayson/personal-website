import * as THREE from 'three';
import Experience from '../Experience';
import GSAP from 'gsap';

export default class Environment {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight(0xffffff, 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.map
        this.sunlight.shadow.normalBias = 0.05;

        // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
        // this.scene.add(helper);

        this.sunlight.position.set(1.5, 7, 3);

        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) {

        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 18 / 255,
                g: 24 / 255,
                b: 36 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 18 / 255,
                g: 24 / 255,
                b: 36 / 255,
            });

            GSAP.to(this.sunlight, {
                intensity: 1.5,
            })
            GSAP.to(this.ambientLight, {
                intensity: 0.7,
            })

        } else {
            GSAP.to(this.sunlight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });

            GSAP.to(this.sunlight, {
                intensity: 3,
            })
            GSAP.to(this.ambientLight, {
                intensity: 0.8,
            })
        }
        
    }

    resize() {

    }

    update() {
        
    }

}