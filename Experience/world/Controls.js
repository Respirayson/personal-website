import * as THREE from 'three';
import Experience from '../Experience';
import GSAP, { Power1 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll';

export default class Controls {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.diorama = this.experience.world.diorama.realDiorama;
        this.diorama.children.forEach(child => {
            if (child.type === "PointLight") {
                this.pointLight = child;
            }
        })

        this.circleFirst = this.experience.world.background.circleFirst;
        this.circleSecond = this.experience.world.background.circleSecond;
        this.circleThird = this.experience.world.background.circleThird;

        this.setHover();
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector("body").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
        
        
        // this.dummyCurve = new THREE.Vector3(0, 0, 0);
        // this.progress = 0;

        // this.position = new THREE.Vector3(0, 0, 0);
        // this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        // this.directionalVector = new THREE.Vector3(0, 0, 0);
        // this.staticVector = new THREE.Vector3(0, 1, 0);
        // this.crossVector = new THREE.Vector3(0, 0, 0);


        // this.setPath();
        // this.onWheel();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.2,
            disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll() {

        this.asscroll = this.setupASScroll();

    }

    setHover() {
        // console.log(this.diorama);
        // this.timeline = GSAP.timeline();
        // this.timeline.to(this.diorama.position, {
        //     x: () => this.sizes.width * 0.00122,
        //     scrollTrigger: {
        //         trigger: ".first-move",
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.5,
        //         invalidateOnRefresh: true,
        //     },
        // });

        GSAP.timeline({repeat: -1}).to(this.diorama.position, {
            y:'-=0.1',
            ease: Power1.easeInOut,
            duration: 3,
        }).to(this.diorama.position, {
            y:'+=0.1',
            ease: Power1.easeInOut,
            duration: 3,
        })

    }

    setScrollTrigger() {

        this.matchMedia = GSAP.matchMedia();

        this.matchMedia.add(
            //desktop
            "(min-width: 969px)", () => {
                // console.log('desktop');
                
                this.diorama.scale.set(1.5, 1.5, 1.5);

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.diorama.position, {
                    x: () => this.sizes.width * 0.00122,
                });

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.diorama.position, {
                    x: () => this.sizes.width * 0.00122,
                    z: () => this.sizes.height * 0.0032,
                }, 'same')
                .to(this.pointLight.position, {
                    x: () => -0.3,
                    y: () => 0.7,
                    z: () => 0.5,
                }, 'same')
                .to(this.pointLight, {
                    distance: 2,
                }, 'same')
                .to(this.diorama.scale, {
                    x: 3.5,
                    y: 3.5,
                    z: 3.5,
                }, 'same');


                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.camera.orthographicCamera.position, {
                    y: 2.5,
                    x: -2,
                    z: 8,
                
                })


                // Circle -----------------
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })
     

                this.secondCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })
               


                this.thirdCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })
                .to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })
                




                this.sections = document.querySelectorAll('.section');
                this.sections.forEach((section, index) => {
                    this.progressWrapper = section.querySelector('.progress-wrapper');
                    this.progressBar = section.querySelector('.progress-bar');

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                        
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
            })  
        })
            
        //mobile
        this.matchMedia.add('(max-width: 968px)', () => {
            console.log('mobile');

            this.diorama.scale.set(0.8, 0.8, 0.8);

            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            })
            .to(this.diorama.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, 'same')
            .to(this.pointLight, {
                distance: 1.2,
            }, 'same');



            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            })
            .to(this.diorama.scale, {
                x: 3,
                y: 3,
                z: 3,
            }, 'same')
            .to(this.pointLight, {
                distance: 3,
            }, 'same')
            .to(this.diorama.position, {
                x: -0.5,
            }, 'same')

            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            })
            .to(this.camera.orthographicCamera.position, {
                y: 2.5,
                x: -2,
                z: 8,
            
            })

            this.sections = document.querySelectorAll('.section');
            this.sections.forEach((section, index) => {
                this.progressWrapper = section.querySelector('.progress-wrapper');
                this.progressBar = section.querySelector('.progress-bar');

                if (section.classList.contains("right")) {
                    GSAP.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                    GSAP.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                    
                } else {
                    GSAP.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                }
                GSAP.from(this.progressBar, {
                    scaleY: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    }
                })
            })

        })

  


        

    }

    // setPath() {
    //     //Create a closed wavey loop
    //     this.curve = new THREE.CatmullRomCurve3( [
    //         new THREE.Vector3( -10, 0, 10 ),
    //         new THREE.Vector3( -5, 5, 5 ),
    //         new THREE.Vector3( 0, 0, 0 ),
    //         new THREE.Vector3( 5, -5, 5 ),
    //         new THREE.Vector3( 10, 0, 10 )
    //     ], true );

    //     this.camera.orthographicCamera.position.copy(this.dummyCurve);

    //     const points = this.curve.getPoints( 50 );
    //     const geometry = new THREE.BufferGeometry().setFromPoints( points );

    //     const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    //     // Create the final object to add to the scene
    //     const curveObject = new THREE.Line( geometry, material );
    //     this.scene.add(curveObject);
    // }

    // onWheel() {
    //     window.addEventListener('wheel', (event) => {
    //         console.log(event);

    //         if (event.deltaY > 0) {
    //             this.lerp.target += 0.01;
    //             this.back = false;
    //         } else {
    //             this.lerp.target -= 0.01;
    //             this.back = true;
    //         }
    //     })
    // }

    resize() {
        
    }

    update() {
        // if (this.back) {
        //     this.lerp.target -= 0.001;
        // } else {
        //     this.lerp.target += 0.001;
        // }

        // GSAP.utils.clamp(0, 1, this.lerp.current);
        // GSAP.utils.clamp(0, 1, this.lerp.target);
        // this.curve.getPointAt(this.lerp.current, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);

        // this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);

        
        // // console.log(this.dummyCurve);
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }

}