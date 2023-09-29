import { Container } from 'pixi.js';
import { SlotMachine } from './components/slotMachine/SlotMachine';
import { SpinButton } from './components/spinButton/SpinButton';


export class GameComponents extends Container {
    private _slotMachine = new SlotMachine();
    private _spinButton = new SpinButton();
    // private _counterPlate = new CounterPlate();

    constructor() {
        super();

        // mount
        this.mount();
    }

    mount() {
        this.addChild(this._slotMachine, this._spinButton);
    }
}
