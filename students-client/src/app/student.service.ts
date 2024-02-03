import { Injectable } from "@angular/core";
import { APP_PROFFETIONALS, P } from "./models/proffetional.model";
import { Student, Year } from "./models/student.model";
import { Observable, filter, map } from "rxjs";
import { HttpClient } from "@angular/common/http"

// const STUDENTS: Student[] = [{ id: 3258, name: "Avi", address: "Ami 9", phone: "03-6192341", isActive: true, average: 95.5, proffetional: APP_PROFFETIONALS[P.Angular], year: Year.First },
// { id: 2433, name: "Yaakov", address: "R Akiva 9", phone: "03-6192341", isActive: true, average: 85.5, proffetional: APP_PROFFETIONALS[P.English], year: Year.Second },
// { id: 3265, name: "Haim Cohen", address: "Ami 9", phone: "03-6192341", average: 99, isActive: true, proffetional: APP_PROFFETIONALS[P.Math], year: Year.Third },
// { id: 433, name: "Yair Marom", address: "Ami 9", phone: "03-6192341", average: 100, isActive: false, dateLeft: new Date(2023, 9, 20), proffetional: APP_PROFFETIONALS[P.Angular], year: Year.Third },
// { id: 5682, name: "Meir Ben David", address: "Ami 9", phone: "03-6192341", average: 95.5, isActive: false, dateLeft: new Date(2023, 10, 1), proffetional: APP_PROFFETIONALS[P.English], year: Year.First },
// ];

@Injectable()
export class StudentService {

    private _students: Student[] = [];
    // getStudents(): Student[] {
    //     return STUDENTS;
    // }

    // getStudentsSlowly(): Promise<Student[]> {
    //     return new Promise((res, rej) => setTimeout(() => res(STUDENTS), 3000))
    // }

    getAverageById(id: number): Promise<number> {
        return new Promise((res, rej) => {
            var student = this.getStudentByIdFromServer(id);
            if (student == undefined)
                rej(`no student has id=${id}`);
            else
                res(student.average);
        })
    }

    countAbsenceDays(id: number): number {
        var count: number = 0;
        this.getStudentByIdFromServer(id)?.absences?.forEach(ab => { count += ab.numberDays; });
        return count;
    }

    getStudentsFromServer(): Observable<Student[]> {
        var students = this._http.get<Student[]>("/api/Students");
        students.subscribe(data => this._students = data);
        return students;
    }

    addStudentToList(student: Student): Observable<boolean> {
        var res = this._http.post<boolean>("/api/", student);
        if (res) this._students.push(student);
        return res;
    }

    deleteStudentFromServerById(id: number): Observable<any> {
        return this._http.delete(`/api/${id}`);
    }

    getStudentsByActive(isActive: boolean): Observable<Student[]> {
        return this._http.get<Student[]>("/api/?active=" + isActive);
    }

    getStudentsByName(name: string): Observable<Student[]> {
        return this._http.get<Student[]>("/api/name=" + name);
    }

    private getStudentByIdFromServer(id: number): Student | undefined {
        if (this._students.length == 0)
            this.getStudentsFromServer().subscribe(data => this._students = data);
        return this._students.find(s => s.id == id);
    }

    constructor(private _http: HttpClient) {

    }
}