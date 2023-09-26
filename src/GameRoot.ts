import { Container } from 'pixi.js';
import { GameComponents } from './GameComponents';
import { createSprite } from './utils';

export class GameRoot extends Container {
    private _background = createSprite('background');
    private _gameComponents = new GameComponents();

    constructor() {
        super();

        // elements
        this._background = createSprite('background');
        this._gameComponents = new GameComponents();

        // mount
        this.mount();
    }

    private mount() {
        this._background.position.set(-600, -1000);
        this._background.width = 3200;
        this._background.height = 3000;
        this.addChild(this._background, this._gameComponents);
    }
}