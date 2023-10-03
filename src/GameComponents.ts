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

        this.resizeGame();

        // mount
        this.mount();
    }

    private resizeGame() {
        window.addEventListener('resize', this.resizeHandler.bind(this, this, 1));
        this.resizeHandler(this, 1);
    }

    private resizeHandler(container: Container, baseScale: number) {
        console.log(window.innerWidth);
        //this.position.set(window.innerWidth / 30, window.renderer.height / 4);
        //this.generalResizeHandler(container, baseScale);
    }

    private generalResizeHandler(container: Container, baseScale: number) {
        const recoveredScaleX = baseScale * window.globalScaleFactorX;
        const recoveredScaleY = baseScale * window.globalScaleFactorY;

        container.scale.set(
            recoveredScaleX,
            recoveredScaleY
        );

        // let shrinkScale = !window.isPortrait
        //     ? this.calculateShrinkScale(0, 630)
        //     : this.calculateShrinkScale(650, 0);

        // if (shrinkScale != null) {
        //     container.scale.set(
        //         recoveredScaleX * shrinkScale,
        //         recoveredScaleY * shrinkScale
        //     )
        // }
    };

    private calculateShrinkScale(widthBorder: number, heightBorder: number) {
        if (window.innerWidth < widthBorder && window.innerHeight < heightBorder) {
            return Math.min(window.innerHeight / heightBorder, window.innerWidth / widthBorder);
        }
        if (window.innerHeight < heightBorder) {
            return window.innerHeight / heightBorder
        }
        if (window.innerWidth < widthBorder) {
            return window.innerWidth / widthBorder;
        }
        return null;
    }

    private mount() {
        this.addChild(this._slotMachine, this._spinButton, this._counterPlate);
    }
}
