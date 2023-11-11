import { writable } from 'svelte/store';

let _besthand = {
    blue: [],
    red: []
}

export const besthand = writable(_besthand);
