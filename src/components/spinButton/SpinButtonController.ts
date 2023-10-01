import { PubSub } from 'typescript-pubsub';
import { SpinPress } from './SpinPress';

export class SpinButtonController {
    private _component: SpinPress

    constructor(component: SpinPress) {
        this._component = component;

        PubSub.subscribe('listenStartSpinButton', () => {
            this._component.listenStartSpinButton();
        });
    }

    public emitSpinButtonPressed(): void {
        PubSub.emit('spinButtonPressed', {});
    }
}