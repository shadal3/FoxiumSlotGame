import { PubSub } from 'typescript-pubsub';
import { CounterPlate } from './Countup';

export class CounterPlateController {
    private _component: CounterPlate

    constructor(component: CounterPlate) {
        this._component = component;

        PubSub.subscribe('showCountup', (target) => {
            this._component.playCountup(target)
        });

        PubSub.subscribe('spinButtonPressed', () => {
            this._component.reset();
        })
    }

    public emitCountupCompleted(): void {
        PubSub.emit('countupDone', {});
    }
}