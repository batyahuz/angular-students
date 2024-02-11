import { Component } from "@angular/core";
import { Student } from "./models/student.model";

@Component({
    templateUrl: "./student.component.html",
    selector: "students"
})
export class StudentComponent {
    student: Student | undefined;

    showQuizes(student: Event) {
        console.log("showQuizes(student: Event) {", student);
    }

    constructor() { }
}
