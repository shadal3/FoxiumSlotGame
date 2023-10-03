import gsap from "gsap";
import { PubSub } from "typescript-pubsub";
import GameModel from "./model/GameModel";

export class GameWorkFlow {
    constructor() {
        this.runWorkFlow();
    }

    private async runWorkFlow(): Promise<void> {
        PubSub.emit('listenStartSpinButton', {});
        await new Promise(resolve => PubSub.subscribe('spinButtonPressed', () => resolve(1)));
        PubSub.emit('startSpinning');
        await gsap.delayedCall(3, () => GameModel.getNextResult()).then();
        PubSub.emit('stopSpinning');
        await new Promise(resolve => PubSub.subscribe('spinningStopped', () => resolve(1)));
        if (GameModel.getResult().win > 0) {
            PubSub.emit('showCountup', GameModel.getResult().win);
            await new Promise(resolve => PubSub.subscribe('countupDone', () => resolve(1)));
        }
        this.runWorkFlow();
    }
}