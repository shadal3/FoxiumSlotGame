
import { Container } from "pixi.js";
import { createSprite, getRandomArrayElement } from '../../utils';

const SYMBOLS_LIST = ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'WILD'];

export class Symbol extends Container {
    
    private _symbol = createSprite(getRandomArrayElement(SYMBOLS_LIST));


    constructor() {
        super();

        this._mount();
    }

    private _mount() {
        this.addChild(this._symbol);
    }
}