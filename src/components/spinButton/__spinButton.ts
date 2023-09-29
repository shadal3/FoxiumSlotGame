
import { Container } from "pixi.js";
import { createSprite } from '../../utils';

export class SpinButton extends Container {

    private spinButton = createSprite('button_spin');


    constructor() {
        super();

        this.mount();

    }

    private mount(): void {
        this.addChild(this.spinButton);
    }
}