import express from 'express';
import cors from 'cors';
import { generateGame } from './game.mjs';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.post('/game/new', async (req, res) => {
    try {
        const { game } = req.body;

        if (!game) {
            return res.status(400).send({ error: 'Context is required in the request body.' });
        }
        const gameData = await generateGame(game);
        res.status(200).json(gameData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error generating game data: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
