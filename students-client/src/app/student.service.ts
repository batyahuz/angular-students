import { Injectable } from "@angular/core";
import { APP_PROFFETIONALS, P } from "./models/proffetional.model";
import { Student, Year } from "./models/student.model";

const STUDENTS: Student[] = [{ id: 3258, name: "Avi", address: "Ami 9", phone: "03-6192341", isActive: true, average: 95.5, proffetional: APP_PROFFETIONALS[P.Angular], year: Year.First },
{ id: 2433, name: "Yaakov", address: "R Akiva 9", phone: "03-6192341", isActive: true, average: 85.5, proffetional: APP_PROFFETIONALS[P.English], year: Year.Second },
{ id: 3265, name: "Haim Cohen", address: "Ami 9", phone: "03-6192341", average: 99, isActive: true, proffetional: APP_PROFFETIONALS[P.Math], year: Year.Third },
{ id: 433, name: "Yair Marom", address: "Ami 9", phone: "03-6192341", average: 100, isActive: false, dateLeft: new Date(2023, 9, 20), proffetional: APP_PROFFETIONALS[P.Angular], year: Year.Third },
{ id: 5682, name: "Meir Ben David", address: "Ami 9", phone: "03-6192341", average: 95.5, isActive: false, dateLeft: new Date(2023, 10, 1), proffetional: APP_PROFFETIONALS[P.English], year: Year.First },
];

@Injectable()
export class StudentService {

    getStudents(): Student[] {
        return STUDENTS;
    }

    getStudentsSlowly(): Promise<Student[]> {
        return new Promise((res, rej) => setTimeout(() => res(STUDENTS), 3000))
    }

    getAverageById(id: number): Promise<number> {
        return new Promise((res, rej) => {
            var student = STUDENTS.find(s => s.id == id);
            if (student == undefined)
                rej(`no student has id=${id}`);
            else
                res(student.average);
        })
    }

    countAbsenceDays(id: number): number {
        var count: number = 0;
        STUDENTS.find(s => s.id == id)?.absences?.forEach(ab => { count += ab.numberDays; });
        return count;
    }
}