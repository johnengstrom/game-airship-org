import { writable } from 'svelte/store';

let loading = true

export const loadingstore = writable(loading);
