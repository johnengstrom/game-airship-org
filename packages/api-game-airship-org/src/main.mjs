import express from 'express';
import cors from 'cors';
import { generateTodo } from './todo.mjs';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.post('/todo/new', async (req, res) => {
    try {

        const { todo, personal } = req.body;

        if (!todo) {
            console.log('req.body', req.body)
            return res.status(400).send({ error: 'todo is required in the request body.' });
        }
        const todouser = await generateTodo(todo, personal);
        res.status(200).json(todouser);
    } catch (error) {
        console.error(error);

        res.status(500).send({ error: 'Error generating todo advice: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
