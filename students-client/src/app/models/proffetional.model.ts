export class Proffetional {
    id?: number;
    name?: P;
    description?: string;
}

export enum P {
    Math = 0,
    English,
    Angular
}

export const APP_PROFFETIONALS: Proffetional[] = [
    { id: P.Math, name: P.Math, description: "Math" },
    { id: P.English, name: P.English, description: "English" },
    { id: P.Angular, name: P.Angular, description: "Angular" }
];