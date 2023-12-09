function setGame(loading, game) {
    console.log('setGame +++++>', loading, game)
    return { loading, game }
}

export function newGame() {

    let _game = $state(setGame(true, {}));

    return {
        get game() { return _game },
        update: (newgame) => _game = setGame(false, newgame)
    };
}


