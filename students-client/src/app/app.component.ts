import { Component } from "@angular/core";
import { Student } from "./modules/students/models/student.model";

@Component({
    templateUrl: "./app.component.html",
    selector: "app-root"
})
export class AppComponent {
    title: string = "Hello Batya's App";

    constructor() { }
}