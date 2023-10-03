
import gsap from "gsap";
import { Container, Graphics } from "pixi.js";
import { concatMap, from, take, toArray } from "rxjs";
import { BASE_REEL_SET } from "../../config";
import { createSprite, shuffleArray } from '../../utils';
import { Reel } from '../reel/Reel';
import { SlotMachineController } from "./SlotMachineController";

const DISTANCE_BETWEEN_REELS = 323;
export class SlotMachine extends Container {

    private _controller = new SlotMachineController(this);

    private _reelsBackground = createSprite('reels');

    private _reels = [...Array(3)].map((_, index) => new Reel(index));

    private _reelSets = [...Array(3)].map(() => shuffleArray(BASE_REEL_SET));

    private _slotMask = this.createMask();


    constructor() {
        super();

        //@ts-ignore
        window.sm = this;

        this.setupReelPosition();
        
        this.updateReelSets();

        this._mask = this._slotMask;

        this._mount();
    }

    public start(): void {
        this._reels.forEach((reel, index) => {
            gsap.to({}, {
                duration: 0.1 * index,
                onComplete: () => reel.start()
            });
        });
    }

    public stop(): void {
        const subscription = from(this._reels).pipe(
            concatMap((reel: Reel) => {
                return new Promise(resolve => reel.stop(resolve));
            }),
            take(3),
            toArray()
            ).subscribe(() => {
            this._controller.emitSpinningStopped();
            subscription.unsubscribe();
        });
    }

    private updateReelSets(): void {
        this._reels.forEach((reel, index) => reel.updateReelSet(this._reelSets[index]));
    }

    private createMask(): Graphics {
        var graphics = new Graphics();

        graphics.alpha = 0.5;

        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(1, 0xFF0000);
        graphics.drawRect(575, 50, 950, 798);

        return graphics;
    }

    private setupReelPosition(): void {
        this._reels.forEach((reel, index) => {
            reel.position.x = index * DISTANCE_BETWEEN_REELS + 590
            reel.position.y = -210;
        });
    }

    private _mount() {
        this._reelsBackground.width = 1000;
        this._reelsBackground.height = 800;
        this._reelsBackground.position.set(550, 50);

        this.addChild(this._reelsBackground);
        this._reels.forEach(reel => this.addChild(reel));

        this.addChild(this._slotMask);

    }
}