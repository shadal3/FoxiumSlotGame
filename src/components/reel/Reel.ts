
import gsap from "gsap";
import { Container } from "pixi.js";
import { Symbol } from '../symbol/Symbol';

const DISTANCE_BETWEEN_SYMBOLS = 350;
export class Reel extends Container {

    private _symbols = [...Array(5)].map(() => new Symbol());
    public _loopTween: GSAPTween;
    private _isStopTriggered: boolean;
    private _promiseResolve: any;
    private _newRepeatPromise = new Promise(resolve => {
        this._promiseResolve = resolve;
    });


    constructor() {
        super();

        //@ts-ignore
        window.reel = this;
        //@ts-ignore
        window.lt = this._loopTween;

        this.scale.y = 0.5;

        this.setupSymbolPositions();

        this._mount();
    }

    private start() {
        this.runLoop();

    }

    private stop() {
        // gsap.globalTimeline.pause();
        this._isStopTriggered = true;
        //const start = gsap.utils.snap(2, this._loopTween.totalTime()) +(1 + 2 * 2);
        // this._loopTween.timeScale(0.5).progress(value)
        //console.log(this._loopTween.progress());
        //this._loopTween.pause();

        const acceleration = { acceleration: 3 }

        

        this._newRepeatPromise.then(() => {
            this._loopTween.pause();
            gsap.to(this._loopTween, {
                duration: 6,
                progress: 1,
                ease: 'power1.out',
            })
        })

        // gsap.to(this._loopTween, {
        //     duration: 3,
        //     progress: 1,
        //     ease: 'power1.out',
        // })
        // this._newRepeatPromise.then(() => {
        //     gsap.to(this._loopTween, {
        //         duration: 6,
        //         timeScale: 0,
        //         ease: "none",
        //     })
        // })
    }

    private loopTween(): void {
        this._loopTween = gsap.to([...this._symbols], {
            y: "+=1750",
            duration: 6,
            ease: 'none',
            modifiers: {
                y: gsap.utils.unitize(y => y % 1750) 
            },
            // ease: "none",
            // onUpdate: () => {
            //     // console.log(this._loopTween.totalTime());
            //     // console.log(this._loopTween.totalDuration());
            //     // console.log(this._loopTween.totalProgress());
            // },
            repeat: -1,
            onRepeat: () => {
                if (this._isStopTriggered) {
                    this._promiseResolve();
                }
            }
            // onRepeat: () => {
            //     gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
            //     this._symbols.unshift(this._symbols.pop());
            //     console.log("call loop tween");
            //     this._loopTween.kill();
            //     //this.loopTween();
            // }
        })
        // console.log(this._loopTweenTimeScale);
        // this._loopTween.timeScale(this._loopTweenTimeScale);
    }

    private accelerateTween(): void {
        const acceleration = { acceleration: 0 }

        gsap.to(acceleration, {
            acceleration: 3,
            duration: 1,
            onUpdate: () => {
                this._loopTween.timeScale(acceleration.acceleration)
            },
            onComplete: () => {
            }
        })
    }

    private runLoop(): void {
        this.loopTween();

        this.accelerateTween();

        // onUpdate: () => {
                //     console.log(this._symbols[2].y);
                //     if (this._symbols[2].y > 1049) {
                //         gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
                //         this._symbols.unshift(this._symbols.pop());
                //     }
                // },

        // timeline.to([this._symbols], {
        //     y: "+=350",
        //     duration: 2,
        //     ease: "none",
        //     repeat: -1, // Бесконечное повторение
        //         modifiers: {
        //             y: (y) => {
        //                 // Вычисляем скорость, чтобы она была равна максимальной скорости при разгоне
        //                 const distance = 300; // Расстояние для перемещения
        //                 const time = 1; // Продолжительность в секундах
        //                 const speed = distance / time; // Рассчитываем скорость
        //                 return y + speed * 0.016; // 0.016 - это приближенное значение для обновления кадров (60FPS)
        //             },
        //         },
        //     onUpdate: () => {
        //         // Проверяем, если самая правая картинка покидает контейнер, возвращаем её в самое лево
        //         if (this._symbols[2].y > 1050) {
        //             gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
        //             this._symbols.unshift(this._symbols.pop());
        //         }
        //     },
        // });

        // timeline.to([this._symbols], {
        //     y: "+=350",
        //     duration: 1,
        //     ease: "power1.out",
        // });

        //timeline.call(this.runLoop.bind(this));
        // gsap.to([...this._symbols], {
        //     y: "+=350",
        //     duration: 2,
        //     ease: "linear",
        //     onComplete: () => {
        //         gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
        //         this._symbols.unshift(this._symbols.pop());
        //         this.runLoop();
        //     },
        // })
    }


    private setupSymbolPositions() {
        this._symbols.forEach((symbol, index) => symbol.position.y = index * DISTANCE_BETWEEN_SYMBOLS);
    }

    private _mount() {
        this._symbols.forEach(symbol => this.addChild(symbol));
    }

    private lt(): GSAPTween {
        return this._loopTween;
    }
}