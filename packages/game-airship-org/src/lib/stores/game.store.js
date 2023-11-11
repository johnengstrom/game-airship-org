import { writable } from 'svelte/store';

let _game = {}

export const game = writable(_game);


