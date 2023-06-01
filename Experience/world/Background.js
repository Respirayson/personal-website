import * as THREE from 'three';
import Experience from '../Experience';

export default class Background {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        
        this.setBackground();
        this.setCircle();
        
    }

    setBackground() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0Xffe9e3, //0Xffe9e3
            side: THREE.DoubleSide
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -1.5;
        this.plane.receiveShadow = true;
    }   

    setCircle() {
        const geometry = new THREE.CircleGeometry( 5, 32 ); 
        const material = new THREE.MeshStandardMaterial( { color: 0xeac9c1 } ); 
        const material2 = new THREE.MeshStandardMaterial( { color: 0xb1adc3 } ); 
        const material3 = new THREE.MeshStandardMaterial( { color: 0x7ae2ae } ); 

        this.circleFirst = new THREE.Mesh( geometry, material );
        this.circleSecond = new THREE.Mesh( geometry, material2 );
        this.circleThird = new THREE.Mesh( geometry, material3 );

        this.circleFirst.position.y = -1.49;

        this.circleSecond.position.set(1.5, -1.47, -0.5)

        this.circleThird.position.set(-1.5, -1.45, -0.5)

        this.circleFirst.scale.set(0, 0, 0)
        this.circleSecond.scale.set(0, 0, 0)
        this.circleThird.scale.set(0, 0, 0)

        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI / 2;

        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);

    }

    resize() {

    }

    update() {

    }

}