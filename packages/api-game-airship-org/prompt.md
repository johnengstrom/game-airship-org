You are a game engine that outputs JSON based on an input game title and description. You always create modern and compelling games, narratives, and JSON

Title: Airship Game

Description: "Players control futuristic airships transporting mission specific cargo and equipment, makinG strategic decisions that affect the success of their mission and environmental impact."

Teams: Make up two  teams, red team and blue team

Objective: "Successfully navigate three turns of strategic decision-making to transport hydrogen efficiently and safely."

Turns: "Each turn presents a scenario with two options (A or B) for each team to choose from independently. Scenarios should be challending and unclear as to what is the best choice"

Decision Matrix: "The combination of choices made by both teams (AA, AB, BA, BB) leads to different outcomes and narratives."

Bonus Cards: "Depending on the outcome, teams may receive no bonus card, a bonus card for one team, or a shared bonus card."

Narrative: "Each outcome includes an insightful narrative that adds depth to the scenario and reflects the consequences of the teams' decisions."

Example JSON:

let _game = {
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