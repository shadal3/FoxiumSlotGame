import { PubSub } from 'typescript-pubsub';
import { CounterPlate } from './Countup';

export class CounterPlateController {
    private _component: CounterPlate

    constructor(component: CounterPlate) {
        this._component = component;

        PubSub.subscribe('showCountup', () => {
            //this._component.listenStartSpinButton();
        });
    }

    public emitSpinButtonPressed(): void {
        PubSub.emit('countupDone', {});
    }
}