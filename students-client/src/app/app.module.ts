import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StudentService } from "./student.service";
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { ObservableDemoComponent } from './observable-demo/observable-demo.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent, StudentsListComponent, StudentDetailsComponent, QuizHistoryComponent, ObservableDemoComponent],
    providers: [StudentService],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
    bootstrap: [AppComponent, StudentsListComponent]
})

export class AppModule {

}