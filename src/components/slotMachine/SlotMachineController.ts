import { PubSub } from 'typescript-pubsub';
import { SlotMachine } from './SlotMachine';

export class SlotMachineController {
  private _component: SlotMachine;

  constructor(component: SlotMachine) {

    this._component = component;

    PubSub.subscribe('startSpinning', () => this._component.start())
    PubSub.subscribe('stopSpinning', () => this._component.stop())
  }

  public emitSpinningStopped(): void {
    PubSub.emit('spinningStopped', {});
  }
}