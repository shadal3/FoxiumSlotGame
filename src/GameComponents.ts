import { Container } from 'pixi.js';
import { CounterPlate } from './components/countup/Countup';
import { SlotMachine } from './components/slotMachine/SlotMachine';
import { SpinPress } from './components/spinButton/SpinPress';


export class GameComponents extends Container {
    private _slotMachine = new SlotMachine();
    private _spinButton = new SpinPress();
    private _counterPlate = new CounterPlate();

    constructor() {
        super();

        // mount
        this.mount();
    }

    mount() {
        this.addChild(this._slotMachine, this._spinButton, this._counterPlate);
    }
}
