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