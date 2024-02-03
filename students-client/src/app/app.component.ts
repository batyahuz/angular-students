import { Component } from "@angular/core";
import { Student } from "./models/student.model";

@Component({
    templateUrl: "./app.component.html",
    selector: "app-root"
})
export class AppComponent {
    //המחלקה תנהל את החלק הלוגי
    //סוג :שם המשתנה 
    title: string = "Hello Batya's App";
    student: Student | undefined;

    // showQuizes(student: Student) {
    showQuizes(student: Event) {
        // this.student = student;
        console.log("showQuizes(student: Event) {", student);

    }

    constructor() { }
}