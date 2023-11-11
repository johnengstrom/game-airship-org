import { writable } from 'svelte/store';


export function newGame(init = {}) {
    const { subscribe, set, update } = writable({ ...init, loading: false });

    // This function will be used to post data to the server
    const create = async (gameData) => {
        update(state => ({ ...state, loading: true }));

        try {
            const response = await fetch('http://192.168.1.13:3001/game/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData),
            });

            console.log('response', response)


            // You might want to update the store with the response from the server
            if (response.ok) {
                const data = await response.json();
                update(state => ({ ...state, data, loading: false }));
            } else {
                update(state => ({ ...state, data: {}, loading: false }));
            }
        } catch (error) {
            console.log(error)
            update(state => ({ ...state, error, loading: false }));
        }

    };

    return {
        subscribe,
        create, // add other methods if necessary, like 'update', 'delete' etc.
        reset: () => set({ ...init, loading: false }), // A reset function to clear the store
    };
}
