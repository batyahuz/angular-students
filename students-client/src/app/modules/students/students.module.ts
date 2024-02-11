import { NgModule } from "@angular/core";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { QuizHistoryComponent } from "./quiz-history/quiz-history.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StudentService } from "./student.service";
import { StudentComponent } from "./student.component";

@NgModule({
    declarations: [StudentComponent, StudentsListComponent, StudentDetailsComponent, QuizHistoryComponent],
    providers: [StudentService],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
    exports: [StudentComponent]//,
    //bootstrap: [StudentsListComponent]
})
export class StudentModule{

}