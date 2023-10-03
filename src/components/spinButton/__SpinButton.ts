
import { Container, Graphics } from "pixi.js";
import { createSprite } from '../../utils';
import { SpinButtonController } from './SpinButtonController';

    private _spinButton = createSprite('button_spin');
    private _spinButtonHitArea = this.createHitAreaPolygon();

    private _controller = new SpinButtonController(this);

    constructor() {
        super();

        this._spinButtonHitArea.position.set(-60, 0);
        this._spinButton.height = 230;
        console.log(this._spinButton.height);
        this.position.set(1610, 313);

        this.addHitAreaListener();
        this.mount();

    }

    public listenStartSpinButton(): void {
        this._spinButtonHitArea.interactive = true
    }

    private addHitAreaListener(): void {
        this._spinButtonHitArea.interactive = true;
        this._spinButtonHitArea.alpha = 0;
        this._spinButtonHitArea.on('touchstart', this._controller.emitSpinButtonPressed)
    }

    private createHitAreaPolygon(): Container {
        const polygonContainer = new Container();

        const rect = new Graphics();
        rect.beginFill(0x00FF00);
        rect.drawRect(110, 85, 160, 110);
        rect.endFill();

        const halfCircleDown = new Graphics();
        halfCircleDown.beginFill(0x00FF00);
        halfCircleDown.bezierCurveTo(0, 0, 80, 80, 160, 0);
        halfCircleDown.endFill();
        halfCircleDown.position.set(110, 195);

        const halfCircleUp = new Graphics();
        halfCircleUp.beginFill(0x00FF00);
        halfCircleUp.bezierCurveTo(0, 0, 80, 80, 160, 0);
        halfCircleUp.endFill();
        halfCircleUp.position.set(110, 86);
        halfCircleUp.scale.y = -1;

        polygonContainer.addChild(rect, halfCircleDown, halfCircleUp);

        return polygonContainer;
    }

    private mount(): void {
        this.addChild(this._spinButton, this._spinButtonHitArea);
    }
}