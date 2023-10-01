
import gsap from "gsap";
import { Container, Text, TextStyle } from "pixi.js";
import { createSprite } from '../../utils';
import { CounterPlateController } from "./CountupController";

const styleConfig = {
    fontFamily: "Arial",
    fontSize: 42,
    fill: "0xffffff",
    stroke: 'black',
    strokeThickness: 4,
};

export class CounterPlate extends Container {

    private _plate = createSprite('counter');
    private _countupText = this.createText('0');
    private _winText = this.createText('win');
    private _currencyText = this.createText('USD');

    private _controller = new CounterPlateController(this);

    constructor() {
        super();

        this.mount();

        this.positionElements();

        this.position.set(100, 400);

        //@ts-ignore
        window.counter = this;

    }

    private countup(target: number): void {
        let amount = {amount: 0};
        gsap.to(amount, {
            amount: 0,
            duration: 4,
            ease: "power1.in",
            stagger: {
              each: 1.0,
              onUpdate: () => {
                console.log(amount.amount);
                this._countupText.text = this.formatNumber(Math.ceil(amount.amount));
              }
            }
          });

    }
    
    private formatNumber(text: number): string {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    private positionElements(): void {
        this._winText.position.set(200, 60);
        this._currencyText.position.set(110, 113);
        this._countupText.position.set(240, 113);
    }

    private createText(text: string) {
        const style = new TextStyle(styleConfig);
        const pixiText = new Text(text, style);
        pixiText.anchor.set(0.5);
        return pixiText;
    }

    private mount(): void {
        this.addChild(this._plate, this._countupText, this._winText, this._currencyText);
    }
}