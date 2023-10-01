
interface SpinResult {
    win: number,
    reels: Array<Array<string>>
}

interface MachineState {
    "machine-state": Array<SpinResult>;
}

let instance: GameModel;
let gameModel: Readonly<GameModel>;


export class GameModel {
    private _serverResponse: MachineState;
    private _result: SpinResult;

    constructor(data: MachineState) {
        if (instance) {
            throw new Error("New instance cannot be created!!");
          }
      
        instance = this

        this._serverResponse = data;
    }

    public getResult(): SpinResult {
        return this._result;
    }

    public getNextResult(): void {
        const result = this._serverResponse["machine-state"].shift();
        if (!result) {
            throw new Error("No more data");
        } else {
            result.reels.forEach((_, index) => {
                console.log("reel " + index + ": " + _ );
            })
            this._result = result;
        }
    }
}

const json = await fetch('../results.json').then((response) => response.json())
export default new GameModel(json);



