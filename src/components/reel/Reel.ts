
import gsap from "gsap";
import { Container } from "pixi.js";
import { BehaviorSubject, filter } from 'rxjs';
import gameModel from "../../model/GameModel";
import { Symbol } from '../symbol/Symbol';

const DISTANCE_BETWEEN_SYMBOLS = 550;
export class Reel extends Container {

    private _symbols = [...Array(5)].map((_, index) => new Symbol(index));

    private _lastRepeatSubject = new BehaviorSubject(false);

    private _isStopTriggered: boolean;

    private _loopTween: GSAPTween;

    private _reelSet: Array<string>;

    private _finalSymbols: Array<string>;

    private _reelIndex: number;

    constructor(reelIndex: number) {
        super();

        //@ts-ignore
        window.reel = this;

        this._reelIndex = reelIndex;

        this.scale.y = 0.5;

        this.setupSymbolPositions();

        this._mount();
    }

    public start() {
        this.reset();
        this.runLoop();
    }

    public updateReelSet(reelSet: Array<string>): void {
        this._reelSet = reelSet;
        this.updateTextures();
    }

    public stop(resolve: any) {
        this._isStopTriggered = true;

        this._finalSymbols = (gameModel.getResult().reels[this._reelIndex]).concat([this.getNextSymbolFromReelSet()]);

        const subscription = this._lastRepeatSubject.pipe(filter(_ => _))
            .subscribe(() => {
                this._loopTween.pause();
                gsap.to(this._loopTween, {
                    duration: 1,
                    progress: 1,
                    ease: 'power1.out',
                    onComplete: () => {
                        subscription.unsubscribe();
                        resolve();
                    }
                })
            })
    }

    private loopTween(): void {
        this._loopTween = gsap.to(this._symbols, {
            y: "+=2750",
            duration: 1,
            ease: 'none',
            onUpdate: () => {
                this._symbols.forEach((symbol, index) => {

                    if (symbol.y > 2750 && symbol.isUpdated === false ) {
                        this.updateShiftedSymbol(symbol);
                        
                        symbol.isUpdated = true;

                        console.log(this._symbols);

                        //this._symbols.unshift(this._symbols.pop());
                    }
                    
                    const wrap = gsap.utils.wrap(0, 2750);
                    symbol.y = wrap(symbol.y);
                });
            },
            repeat: -1,
            onRepeat: () => {
                this._symbols.forEach(symbol => symbol.isUpdated = false);
                if (this._isStopTriggered) {
                    this._lastRepeatSubject.next(true);
                }
            }
        })
    }

    private updateShiftedSymbol(symbol: Symbol): void {
        console.log(this._reelIndex, symbol.index);
        if (this._lastRepeatSubject.value) {
            symbol.updateTexture(this._finalSymbols.pop());
        } else {
            symbol.updateTexture(this.getNextSymbolFromReelSet());
        }
    }

    private accelerateTween(): void {
        const acceleration = { acceleration: 0 }

        gsap.to(acceleration, {
            acceleration: 3,
            duration: 1,
            onUpdate: () => {
                this._loopTween.timeScale(acceleration.acceleration)
            },
        })
    }

    private runLoop(): void {
        this.loopTween();

        this.accelerateTween();
    }

    private updateTextures(): void {
        this._symbols.forEach(symbol => symbol.updateTexture(this.getNextSymbolFromReelSet()));
    }

    private getNextSymbolFromReelSet(): string {
        const symbol = this._reelSet.shift();
        this._reelSet.push(symbol);
        return symbol;
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