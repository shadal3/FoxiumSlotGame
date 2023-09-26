
import { Container } from "pixi.js";
import { createSprite, getRandomArrayElement } from '../../utils';

export class Symbol extends Container {
    
    private _symbol = createSprite(getRandomArrayElement(SYMBOLS_LIST));


    constructor() {
        super();

        this._mount();
    }

    private _mount() {
        this.addChild(this._symbol);
        this.
    }
}