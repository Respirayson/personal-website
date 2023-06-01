import * as THREE from 'three';
import Experience from '../Experience';
import GSAP from 'gsap';

export default class Diorama {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.diorama = this.resources.items.diorama;        
        this.cloud = this.resources.items.cloud;
        this.realCloud = this.cloud.scene;
        // console.log(this.realCloud)

        this.realCloud.scale.set(0.0011843438471178332, 0.0011843438471178332, 0.0011843438471178332);
        this.realCloud.position.set(-0.012500346964140874, -0.23315969127387765, 0.027752093864337468);

        this.realDiorama = this.diorama.scene;
        this.realDiorama.scale.set(0, 0, 0);
        this.realDiorama.position.set(-0.2, -0.9, 0);
        
       

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.onMouseMove();
        // this.setAnimation();
    }

    setModel() {
        this.realCloud.receiveShadow = true;
        this.realCloud.castShadow = true;
        this.realDiorama.castShadow = true;
        this.realDiorama.receiveShadow = true;

        const recurse = (arr) => {
            arr.forEach((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                } else {
                    recurse(child.children);
                }
            })
        }

        var children = this.realDiorama.children;
        recurse(children);
        recurse(this.realCloud.children);
        // console.log(children);

        this.pointLight = new THREE.PointLight(0xffffff, 2, 1, 1);
        this.pointLight.position.set(-0.4, 0.85, 0.4);
        this.realDiorama.add(this.pointLight);

        // this.rectLightHelper = new THREE.PointLightHelper(this.rectLight);
        // this.rectLight.add(this.rectLightHelper);

        this.scene.add(this.realCloud);        
        this.scene.add(this.realDiorama);
        this.realDiorama.rotation.y = Math.PI / 2.5;
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.realDiorama);
        this.action = this.mixer.clipAction(this.diorama.animations[0]);
        this.action.play();
    }

    onMouseMove() {
        window.addEventListener('mousemove', (event) => {
            // console.log(event);
            this.rotation = (event.clientX - (window.innerWidth / 2)) * 2 / window.innerWidth;
            // console.log(this.rotation)
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize() {
        
    }

    update() {
        // this.mixer.update(this.time.delta);
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.realDiorama.rotation.y = Math.PI / 2.5 + this.lerp.current;
    }

}