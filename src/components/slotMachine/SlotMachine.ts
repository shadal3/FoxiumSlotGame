
import { Container } from "pixi.js";
import { createSprite } from "../../utils";
import { Reel } from '../reel/Reel';
import { SlotMachineController } from "./SlotMachineController";

export class SlotMachine extends Container {
    private _controller = new SlotMachineController(this);
    private _reelsBackground = createSprite('reels');
    private _reels = [...Array(3)].map(() => new Reel());


    constructor() {
        super();

        this._mount();
    }

    private _mount() {
        this._reelsBackground.width = 1600;
        this._reelsBackground.height = 800;
        this._reelsBackground.position.set(140, 100);

        this.addChild(this._reelsBackground);

    }
}