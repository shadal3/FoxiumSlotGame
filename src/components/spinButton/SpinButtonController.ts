import { PubSub } from '../../PubSubPattern';
import { SpinButton } from './__SpinButton';

export class SpinButtonController {
    private _component: SpinButton

    constructor(component: SpinButton) {
        this._component = component;

        PubSub.subscribe('listenStartSpinButton', () => {
            this._component.listenStartSpinButton();
        });
    }

    public emitSpinButtonPressed(): void {
        PubSub.emit('spinButtonPressed', {});
    }
}