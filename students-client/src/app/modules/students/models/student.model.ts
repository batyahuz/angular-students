import { Absence } from "./absence.model";
import { Proffetional } from "./proffetional.model";
import { Quiz } from "./quiz.model";

export class Student {
    public id?: number;
    public tz?: number;
    public name?: string;
    public address?: string;
    public phone?: string;
    public isActive: boolean = true;
    public average: number;
    public dateLeft?: Date;
    public proffetional?: Proffetional;
    public year?: string;
    public quizes?: Quiz[];
    public absences?: Absence[];

    constructor() {
        this.id = -1;
        this.isActive = true;
        this.average = 0;
    }

    toString(): String {
        let s: string = "";
        Student.arguments.array.forEach((element: any) => {

        });
        return s;
    }
};
