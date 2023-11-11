import OpenAI from 'openai';
import dotenv from 'dotenv';
import { writeFile } from 'fs/promises';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const context = `You are a game engine called Airship Game. All stories must weave in a near future where intelligent airships are used to perform Earth's most important missions.

Description: "Players control futuristic airships transporting mission specific cargo and equipment, making strategic decisions that affect the success of their mission and environmental impact."

Teams: Make up two  teams, red team and blue team

Objective: "Successfully navigate three turns of strategic decision-making to transport hydrogen efficiently and safely."

3 Turns: "Each turn presents a scenario with two options (A or B) for each team to choose from independently. Scenarios should be challending and unclear as to what is the best choice"

Scenarios: Scenarios should be clever, interesting, and thought provoking. This is the heart of the game. Winning extra cards or turning over an opponents card can instantly change the best possible hand held by the other player. They should pull in the hard issues from the scenario. If the players do not read the scenario carefully, they may miss clues that could informt the decision matric.

Decision Matrix: "The combination of choices made by both teams (AA, AB, BA, BB) leads to different outcomes and narratives. Weaves a subtle details from the description so the players are rewared for reading and engaging in the gameDescription"


Bonus Cards: "Depending on the outcome, teams may receive no bonus card, a bonus card for one team. Randomly tell the player to manipulate cards as follows: Turn over any of the other players card (taking it out of play).  "

Narrative: "Each outcome includes an insightful narrative essay that adds depth to the scenario and reflects the consequences of the teams' decisions. Players like to read the narratives, so weave in current issues and news. "

gameDescription, scenario and options should be a long paragraoh so the game last longer.

Example JSON:

{
        "gameTitle": "Hydrogen Skies: The Green Voyage",
        "gameDescription": "Two futuristic airships embark on an eco-mission to transport green hydrogen from a deep-sea platform to Germany. Each decision made by the airship crews affects the success of the mission and the environment.",
        "setting": {
            "location": "Above the Atlantic Ocean",
            "missionStart": "Deep Sea Green Hydrogen Platform",
            "missionEnd": "Germany"
        },
        "teams": {
            "blueTeam": {
                "name": "Aeolus Wings",
                "description": "Specializing in efficient navigation and weather management."
            },
            "redTeam": {
                "name": "Poseidon Carriers",
                "description": "Experts in cargo handling and energy conservation."
            }
        },
        "turns": [
            {
                "turnNumber": 1,
                "scenario": "Both airships encounter a strong storm that could potentially slow them down. They must decide how to navigate.",
                "options": {
                    "A": "Navigate through the storm using advanced guidance systems.",
                    "B": "Detour around the storm, which uses more hydrogen but ensures safety."
                },
                "outcomes": {
                    "AA": {
                        "narrative": "Both teams chose to brave the storm. The advanced systems handled it well, and they maintained speed without extra hydrogen usage. Their timely arrival gives them a lead in the mission.",
                        "bonusCard": "none"
                    },
                    "AB": {
                        "narrative": "One team braved the storm while the other detoured. The detouring team is delayed but consumes more hydrogen, potentially affecting the rest of their journey.",
                        "bonusCard": "blueTeam"
                    },
                    "BA": {
                        "narrative": "One team detoured while the other pushed through the storm. The storm-facing team makes good time, while the other uses extra fuel, putting their efficiency at risk.",
                        "bonusCard": "redTeam"
                    },
                    "BB": {
                        "narrative": "Both teams chose to detour. They consume more hydrogen but avoid any risk from the storm. They share insights over the radio, learning from each other's experiences.",
                        "bonusCard": "shared"
                    }
                }
            },
            {
                "turnNumber": 2,
                "scenario": "A call for help is received from a distressed ship carrying essential medical supplies.",
                "options": {
                    "A": "Attempt a risky maneuver to quickly assist the ship.",
                    "B": "Coordinate with nearby ships for a collective rescue effort."
                },
                "outcomes": {
                    "AA": {
                        "narrative": "Both teams attempt the rescue. The risky maneuver is successful, but it strains their hydrogen reserves. They've shown great bravery, but at what cost?",
                        "bonusCard": "none"
                    },
                    "AB": {
                        "narrative": "One airship takes the risk alone, while the other coordinates help. The assisting airship gains goodwill but loses time and fuel, while the other is hailed for its strategic thinking.",
                        "bonusCard": "blueTeam"
                    },
                    "BA": {
                        "narrative": "With one airship coordinating and the other attempting the rescue, efforts are doubled, leading to success with minimal hydrogen loss. Both teams are praised for their collaboration.",
                        "bonusCard": "redTeam"
                    },
                    "BB": {
                        "narrative": "Both teams coordinate for a collective effort. The rescue is slow but without extra hydrogen usage. Their joint effort is a testament to the power of teamwork.",
                        "bonusCard": "shared"
                    }
                }
            },
            {
                "turnNumber": 3,
                "scenario": "The airships are approaching the European coast but face strict air traffic regulations, requiring precise timing.",
                "options": {
                    "A": "Speed up to ensure an early arrival for easier traffic management.",
                    "B": "Maintain current speed and negotiate the traffic in real-time."
                },
                "outcomes": {
                    "AA": {
                        "narrative": "Both teams speed up and arrive early, avoiding the traffic complexities but using additional hydrogen. They face a delicate balance between punctuality and sustainability.",
                        "bonusCard": "none"
                    },
                    "AB": {
                        "narrative": "One team speeds up, while the other negotiates. The faster team faces a fine for early arrival, while the negotiator maneuvers successfully and is recognized for its precise planning.",
                        "bonusCard": "blueTeam"
                    },
                    "BA": {
                        "narrative": "With one team arriving early and the other negotiating, the traffic is managed efficiently. The early team faces a slight delay due to regulations, but it's a small price for being proactive.",
                        "bonusCard": "redTeam"
                    },
                    "BB": {
                        "narrative": "Both teams opt for real-time negotiation. It’s a challenging end to the mission, but their adept handling of the regulations showcases their expertise in sustainable transport management.",
                        "bonusCard": "shared"
                    }
                }
            }
        ]
    }`;

async function generateGame(game) {
    console.log('Calling OpenAI', Date.now())
    let content = `Create a new Airship game using this scenario: ${game}`
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ "role": "system", "content": context }, { "role": "user", "content": content }],
    });



    let parsed;

    try {
        parsed = JSON.parse(response.choices[0].message.content);
    } catch (error) {
        parsed = error
    }

    const now = new Date();
    const timestamp = `_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getFullYear()}_${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_${now.getSeconds().toString().padStart(2, '0')}`;
    const filePath = `games/game${timestamp}.json`;

    await writeFile(filePath, JSON.stringify(parsed, null, 2));
    console.log(`The game data has been saved to ${filePath}!`);


    return parsed;
}

export { generateGame };
