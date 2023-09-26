
import { Container } from "pixi.js";
import { Symbol } from '../symbol/Symbol';


export class Reel extends Container {
    
    private _symbols = [...Array(3)].map(() => new Symbol());


    constructor() {
        super();

        this._mount();
    }

    private _mount() {
        this._symbols.forEach(symbol => this.addChild(symbol));
    }
}