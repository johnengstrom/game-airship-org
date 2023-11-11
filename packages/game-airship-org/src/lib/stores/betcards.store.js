import { writable } from 'svelte/store';

let _betcards = [
    {
        "suit": "Navigation",
        "value": 212346,
        "energyCost": 42669,
        "effect": "Remove other team crew 1 from board"
    },
    {
        "suit": "Navigation",
        "value": 260517,
        "energyCost": 24723,
        "effect": "Remove other team crew 2 from board"
    },
    {
        "suit": "Navigation",
        "value": 62289,
        "energyCost": 14852,
        "effect": "Remove other team card 3 from board"
    },
    {
        "suit": "Navigation",
        "value": 284745,
        "energyCost": 7682,
        "effect": "Remove other team crew 4 from board"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "Remove other team crew 5 from board"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "Remove other team crew 1 from board"
    },
    {
        "suit": "Airship",
        "value": 150924,
        "energyCost": 27119,
        "effect": "Remove other team crew 2 from board"
    },
    {
        "suit": "Navigation",
        "value": 182708,
        "energyCost": 21445,
        "effect": "Remove other team crew 3 from board"
    },
    {
        "suit": "Navigation",
        "value": 258478,
        "energyCost": 37488,
        "effect": "Remove team card 4 from board"
    },
    {
        "suit": "Communication",
        "value": 77270,
        "energyCost": 11299,
        "effect": "Removany other team crew 5 from board"
    },
    {
        "suit": "Airship",
        "value": 66149,
        "energyCost": 3944,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 284165,
        "energyCost": 37437,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 107144,
        "energyCost": 10869,
        "effect": "Remove other team crew 1 from board"
    },
    {
        "suit": "Communication",
        "value": 229629,
        "energyCost": 25623,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 111754,
        "energyCost": 47843,
        "effect": "Remove other team crew 2 from board"
    },
    {
        "suit": "Airship",
        "value": 88809,
        "energyCost": 12490,
        "effect": "Remove other team crew 3 from board"
    },
    {
        "suit": "Crew",
        "value": 92473,
        "energyCost": 15973,
        "effect": "Remove other team crew 4 from board"
    },
    {
        "suit": "Navigation",
        "value": 119564,
        "energyCost": 19924,
        "effect": "Remove other team crew 4 from board"
    }

    ,
    {
        "suit": "Crew",
        "value": 111754,
        "energyCost": 47843,
        "effect": "Remove any other crew team card from board"
    },
    {
        "suit": "Airship",
        "value": 88809,
        "energyCost": 12490,
        "effect": "Remove any other crew team card from board"
    },
    {
        "suit": "Crew",
        "value": 92473,
        "energyCost": 15973,
        "effect": "Remove any other crew team card from board"
    },
    {
        "suit": "Navigation",
        "value": 119564,
        "energyCost": 19924,
        "effect": "Remove any other crew team card from board"
    }
    ,
    {
        "suit": "Navigation",
        "value": 119564,
        "energyCost": 19924,
        "effect": "Remove other team upgrade card 1 from board"

    },
    {
        "suit": "Airship",
        "value": 88809,
        "energyCost": 12490,
        "effect": "Remove other team upgrade card 2 from board"
    },
    {
        "suit": "Crew",
        "value": 92473,
        "energyCost": 15973,
        "effect": "Remove other team upgrade card 3 from board"
    },
    {
        "suit": "Navigation",
        "value": 119564,
        "energyCost": 19924,
        "effect": "Remove any other team upgrade card from board"
    }
    ,
    {
        "suit": "Navigation",
        "value": 119564,
        "energyCost": 19924,
        "effect": "Remove any other team upgrade card from board"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 2 crew cards"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 2 crew cards"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Crew",
        "value": 83159,
        "energyCost": 5161,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Airship",
        "value": 169630,
        "energyCost": 7899,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Communication",
        "value": 126998,
        "energyCost": 40469,
        "effect": "draw 1 crew card"
    },
    {
        "suit": "Navigation",
        "value": 298666,
        "energyCost": 8521,
        "effect": "draw 1 crew card"
    }

]

export const betcards = writable(_betcards);
