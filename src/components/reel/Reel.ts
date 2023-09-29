
import gsap from "gsap";
import { Container } from "pixi.js";
import { BehaviorSubject, filter } from 'rxjs';
import { Symbol } from '../symbol/Symbol';

const DISTANCE_BETWEEN_SYMBOLS = 350;
export class Reel extends Container {

    private _symbols = [...Array(5)].map(() => new Symbol());
    public _loopTween: GSAPTween;
    private _isStopTriggered: boolean;
    private _lastRepeatSubject = new BehaviorSubject(false);


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

    public start() {
        this.reset();
        this.runLoop();

    }

    public stop() {
        this._isStopTriggered = true;

        const subscription = this._lastRepeatSubject.pipe(filter(_ => _))
        .subscribe(() => {
            this._loopTween.pause();
            gsap.to(this._loopTween, {
                duration: 1,
                progress: 1,
                ease: 'power1.out',
                onComplete: () => {
                    subscription.unsubscribe();

                }
            })
        })
    }

    private loopTween(): void {
        this._loopTween = gsap.to([...this._symbols], {
            y: "+=1750",
            duration: 1,
            ease: 'none',
            modifiers: {
                y: gsap.utils.unitize(y => y % 1750) 
            },
            repeat: -1,
            onRepeat: () => {
                if (this._isStopTriggered) {
                    this._lastRepeatSubject.next(true);
                }
            }
        })
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
    }


    private setupSymbolPositions() {
        this._symbols.forEach((symbol, index) => symbol.position.y = index * DISTANCE_BETWEEN_SYMBOLS);
    }

    private _mount() {
        this._symbols.forEach(symbol => this.addChild(symbol));
    }

    private reset(): void {
        this._lastRepeatSubject.next(false);
        this._isStopTriggered = false;
    }
}