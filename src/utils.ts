import { Assets, Sprite } from "pixi.js";

export const createSprite = (name: string): Sprite => {
    const texture = Assets.cache.get(name);
    const sprite = new Sprite(texture);
    sprite.name = name;
    return sprite;
}

export const getRandomNumber = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export const getRandomArrayElement = <T>(array: ReadonlyArray<T>) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}