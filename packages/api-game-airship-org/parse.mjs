// ES Module syntax
import { promises as fs } from 'fs';

async function readAndParseJSONFile(filePath) {
    try {
        // Read file contents
        const data = await fs.readFile(filePath, 'utf8');

        // Parse the content as JSON
        const jsonData = JSON.parse(data);

        // Log the JSON object

        let parsed = JSON.parse(jsonData.choices[0].message.content)
        console.log(parsed);

        // If you need to use the jsonData object for further processing, you can do so here
        // For example:
        // processJSONObject(jsonData);

    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
    }
}

// Replace 'game.json' with the path to your actual JSON file
const filePath = 'game.json';
readAndParseJSONFile(filePath);
