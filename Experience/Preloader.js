import { EventEmitter } from 'events';
import Experience from './Experience';
import GSAP from 'gsap';
import converter from '../Experience/utils/converter'

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.world = this.experience.world;
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
            console.log(this.device)
        });


        this.world.on("worldReady", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {

        converter(document.querySelector(".intro-text"))
        converter(document.querySelector(".hero-main-title"))
        converter(document.querySelector(".hero-main-subtitle"))
        converter(document.querySelector(".first-subheading"))
        converter(document.querySelector(".second-subheading"))

        this.cloud = this.experience.world.diorama.realCloud;
        this.diorama = this.experience.world.diorama.realDiorama;
        this.pointLight = this.experience.world.diorama.pointLight;
        this.pointLight.intensity = 0;
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();

            this.timeline.set(".animated-letter", { y: 0, yPercent: 100})

            this.timeline
            .to(".preloader", {
                opacity: 0,
                delay: 0.5,
                onComplete:(() => {
                    document.querySelector(".preloader").style.display = "none";
                })
            })

            if (this.device === "desktop") {
    
                this.timeline.to(this.cloud.scale, {
                    x: 0.0016843438471178332, 
                    y: 0.0016843438471178332, 
                    z: 0.0016843438471178332,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                })
                .to(this.cloud.position, {
                    x: -1.2,
                    ease: "power1.out",
                    duration: 0.7,
                })             
    
            } else {
                this.timeline.to(this.cloud.scale, {
                    x: 0.0016843438471178332, 
                    y: 0.0016843438471178332, 
                    z: 0.0016843438471178332,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                })
                .to(this.cloud.position, {
                    z: -2,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }

            this.timeline
            .to(".intro-text .animated-letter", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(2.5)",
            }, "wrappers")
            .to(".expand-wrapper", {
                opacity: 1,
            }, "wrappers")
            .to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve
            }, "wrappers")


        })
    }

    transition() {
        return new Promise((resolve) => {
            this.transitionTimeline = new GSAP.timeline();


            if (this.device === "desktop") {
    
                this.transitionTimeline
                .to(".intro-text .animated-letter", {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: "back.out(2.5)",
                }, 'goAway')
                .to(".expand-wrapper", {
                    opacity: 0,
                }, "goAway")
                .to(this.cloud.position, {
                    x: -0.012500346964140874, 
                    y: -0.18315969127387765, 
                    z: 0.027752093864337468,
                    ease: 'power1.out',
                    duration: 1,
                }, "goAway")
                .to(this.cloud.rotation, {
                    y: 2 * Math.PI + Math.PI / 4,
                    ease: 'power1.out', 
                    duration: 0.7,
                })
                .to(this.camera.orthographicCamera.position, {
                    y: 2.5,
                    ease: 'power1.out',
                }, 'same')
                .to(this.cloud.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',
                    duration: 0.7,
                }, 'same')
                .to(".hero-main .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".hero-subtitle .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".first-subheading .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".second-subheading .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(this.diorama.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    ease: 'power1.out',
                    duration: 0.7,
                }, 'spinOut')
                .to(this.diorama.rotation, {
                    y: 4 * Math.PI + Math.PI / 2.5,
                    ease: 'power1.out', 
                    duration: 0.7,
                    onComplete: resolve,
                }, 'spinOut')
                .to(".expand-wrapper", {
                    opacity: 1,
                })
    
            } else {
                this.transitionTimeline
                .to(".intro-text .animated-letter", {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: "back.out(2.5)",
                }, 'goAway')
                .to(".expand-wrapper", {
                    opacity: 0,
                }, "goAway")
                .to(this.cloud.position, {
                    x: -0.012500346964140874, 
                    y: -0.18315969127387765, 
                    z: 0.027752093864337468,
                    ease: 'power1.out',
                    duration: 1,
                }, "goAway")
                .to(this.cloud.rotation, {
                    y: 2 * Math.PI + Math.PI / 4,
                    ease: 'power1.out', 
                })
                .to(this.camera.orthographicCamera.position, {
                    y: 2.5,
                    ease: 'power1.out',
                }, 'same')
                .to(this.cloud.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',
                    duration: 0.7,
                }, 'same')
                .to(".hero-main .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".hero-subtitle .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".first-subheading .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(".second-subheading .animated-letter", {
                    yPercent: 0,                    
                    stagger: 0.07,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, 'spinOut')
                .to(this.diorama.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    ease: 'power1.out',
                    duration: 0.7,
                }, 'spinOut')
                .to(this.diorama.rotation, {
                    y: 4 * Math.PI + Math.PI / 2.5,
                    ease: 'power1.out', 
                    duration: 0.7,
                    onComplete: resolve,
                }, 'spinOut')
                .to(".expand-wrapper", {
                    opacity: 1,
                })
            }
        })
        

    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playTransition();
        }

    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;


    }

    onTouchMove(e) {
        this.currentY = e.touches[0].clientY;
        this.difference = this.initialY = this.currentY;
        if (this.difference > 0) {
            console.log("scrolling")
            this.removeEventListeners();
            this.playTransition();
        }
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scaleFlag = false;
        this.scrollEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playTransition() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.transition();
        this.pointLight.intensity = 1;
        this.scaleFlag = false;
        console.log("transition done")
        this.emit('enablecontrols');
    }

    move() {
        if (this.device === "desktop") {
            this.cloud.position.set(-2, 0, 0)
        } else {
            this.cloud.position.set(0, 0, -2)
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.diorama.scale.set(1.5, 1.5, 1.5)
        } else {
            this.diorama.scale.set(0.8, 0.8, 0.8)
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}