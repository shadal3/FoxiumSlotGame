
import gsap from "gsap";
import { Container } from "pixi.js";
import { BASE_REEL_SET } from "../../config";
import { createSprite, shuffleArray } from '../../utils';
import { Reel } from '../reel/Reel';
import { SlotMachineController } from "./SlotMachineController";

const DISTANCE_BETWEEN_REELS = 520;
export class SlotMachine extends Container {

    private _controller = new SlotMachineController(this);

    private _reelsBackground = createSprite('reels');

    private _reels = [...Array(3)].map((_, index) => new Reel(index));

    private _reelSets = [...Array(3)].map(() => shuffleArray(BASE_REEL_SET));


    constructor() {
        super();

        //@ts-ignore
        window.sm = this;

        this.setupReelPosition();
        
        this.updateReelSets();

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
        this._reels.forEach(reel => reel.stop());
    }

    private updateReelSets(): void {
        this._reels.forEach((reel, index) => reel.updateReelSet(this._reelSets[index]));
    }

    private setupReelPosition() {
        this._reels.forEach((reel, index) => reel.position.x = index * DISTANCE_BETWEEN_REELS + 250);
    }

    private _mount() {
        this._reelsBackground.width = 1600;
        this._reelsBackground.height = 800;
        this._reelsBackground.position.set(140, 100);

        this.addChild(this._reelsBackground);
        this._reels.forEach(reel => this.addChild(reel));

    }
}