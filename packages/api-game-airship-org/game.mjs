import OpenAI from 'openai';
import dotenv from 'dotenv';
import { writeFile } from 'fs/promises';




// Load environment variables
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const context = `You are a game engine called Airship Game. All stories must weave in a near future where intelligent airships are used to perform Earth's most important missions.

Description: "Players control futuristic airships transporting mission specific cargo and equipment, making strategic decisions that affect the success of their mission and environmental impact."

Teams: Make up two  teams, red team and blue team

Objective: "Successfully navigate three turns of strategic decision-making to transport hydrogen efficiently and safely."

3 Turns: "Each turn presents a scenario with two options (A or B) for each team to choose from independently. Scenarios should be challending and unclear as to what is the best choice"

Decision Matrix: "The combination of choices made by both teams (AA, AB, BA, BB) leads to different outcomes and narratives."

Scenarios: Scenarios should be clever, interesting, and thought provoking. This is the heart of the game. Winning extra cards or turning over an opponents card can instantly change the best possible hand held by the other player. They should pull in the hard issues from the scenario.

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

const game = `Create a new game based on this:

Introduction:

Amidst the global call for wildlife conservation, Greater Good Charities’ Project Peril stands as a beacon of hope.Their dedication to saving species teetering on the brink of extinction is a testament to humanity's capacity for positive change. This essay celebrates their latest triumph in pangolin conservation, coinciding with the 16th annual Endangered Species Day.

The Plight of the Pangolin:

Pangolins, often described as shy and reclusive, have faced relentless threats from illegal wildlife trade.In Africa alone, poaching claims the lives of up to 2.7 million pangolins annually.Their meat is a coveted delicacy in parts of Asia, while their scales and even fetuses are misguidedly used in traditional medicine.This merciless exploitation has rendered them the most heavily trafficked wild mammal worldwide.

A Beacon of Hope:

In a world where such grim narratives are common, Greater Good Charities and Wildlife At Risk have emerged as harbingers of hope.Thanks to the unwavering support of donors, a significant milestone was recently achieved - the completion of a new pangolin enclosure in Vietnam.This facility isn't just a safe haven; it's a cornerstone in the fight for the pangolins’ survival.

The New Enclosure: A Sanctuary for Recovery and Growth:

The enclosure, a blend of ingenuity and compassion, offers these rescued pangolins a nurturing environment.It includes features like a large tube with small holes, simulating a natural hunting experience for these ant - eating mammals.This innovative design is a significant upgrade from their previous, unnatural feeding methods.The facility also incorporates domes to replicate the pangolins' natural habit of coiling in underground nests, adapting to their inability to dig deep in the facility.

Celebration and Continuous Efforts:

The completion of this enclosure is a cause for celebration, marking a pivotal moment in pangolin conservation.It symbolizes not just a safe space for these creatures but a step forward in their species’ recovery through a planned breeding program.The upcoming launch of a LIVE Nest Cam will offer the world a glimpse into the lives of these pangolins as they adapt to their new home.

    Conclusion:

The story of the pangolins is a stark reminder of the fragility of our natural world and the consequences of human actions.Yet, it also exemplifies the power of collective effort and the impact of compassionate stewardship.As Greater Good Charities continues its vital work, they remind us of our responsibility and ability to effect change, urging continued support in protecting wildlife around the globe.

Support the Effort:

Join the mission to safeguard wildlife by supporting Greater Good Charities.Your contribution can make a difference in the lives of countless endangered species, including the precious pangolins.`



const response = await openai.chat.completions.create({
    model: "GPT-4-0613",
    messages: [{ "role": "system", "content": context },
    { "role": "user", "content": game }],
});

let parsed = JSON.parse(response.choices[0].message.content)


// Now we have the response, let's write it to game.json
await writeFile('response.json', JSON.stringify(response, null, 2));
await writeFile('game.json', JSON.stringify(parsed, null, 2));

console.log('The game data has been saved to game.json!');



