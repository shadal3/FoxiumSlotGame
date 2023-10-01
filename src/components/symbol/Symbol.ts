
import { Assets, Container } from "pixi.js";
import { SYMBOLS_LIST } from '../../config';
import { createSprite, getRandomArrayElement } from '../../utils';


export class Symbol extends Container {
    
    private _symbol = createSprite(getRandomArrayElement(SYMBOLS_LIST));
    private _isUpdated = false;
    private _index: number;


    constructor(index: number) {
        super();

        this._index = index;

        this._mount();
    }

    set isUpdated(bool: boolean) {
        this._isUpdated = bool;
    }

    get isUpdated(): boolean {
        return this._isUpdated;
    }

    get index(): number {
        return this._index;
    }

    public updateTexture(id: string): void {
        this._symbol.texture = Assets.cache.get(id);
    }

    private _mount() {
        this.addChild(this._symbol);
    }
}