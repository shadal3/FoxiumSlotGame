
import gsap from "gsap";
import { Container } from "pixi.js";
import { Symbol } from '../symbol/Symbol';

const DISTANCE_BETWEEN_SYMBOLS = 350;
export class Reel extends Container {

    private _symbols = [...Array(3)].map(() => new Symbol());


    constructor() {
        super();

        //@ts-ignore
        window.reel = this;

        this.setupSymbolPositions();

        this._mount();
    }

    private start() {
        this.runLoop();

    }

    private stop() {
        gsap.globalTimeline.pause();
    }

    private runLoop(): void {
        //const timeline = gsap.timeline();

        const tween = gsap.to([...this._symbols], {
            y: "+=350",
            duration: 3,
            ease: "linear",
            onComplete: () => {
                gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
                this._symbols.unshift(this._symbols.pop());
                const loopfn = () => {
                    gsap.to([...this._symbols], {
                        y: "+=350",
                        duration: 2,
                        ease: "none",
                        onComplete: () => {
                            gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
                            this._symbols.unshift(this._symbols.pop());
                            loopfn();
                        }
                        // onUpdate: () => {
                        //     console.log(this._symbols[2].y);
                        //     if (this._symbols[2].y > 1049) {
                        //         gsap.set(this._symbols[2], { y: "-=" + 350 * 3 });
                        //         this._symbols.unshift(this._symbols.pop());
                        //     }
                        // },
                    })
                }
                loopfn();
            }
        });

        const bar = { acc: 1 };

        const accelerationTween = gsap.to(bar, {
            acc: 3,
            duration: 1,
            onUpdate: () => {
                console.log(bar.acc);
                tween.timeScale(bar.acc)
            },
            onComplete: () => console.log(bar)
        })

        console.log(bar);

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
}