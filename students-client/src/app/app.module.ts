import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StudentService } from "./modules/students/student.service";
import { ObservableDemoComponent } from './modules/demo/observable-demo/observable-demo.component';
import { StudentModule } from "./modules/students/students.module";

@NgModule({
    declarations: [AppComponent, ObservableDemoComponent],
    providers: [StudentService],
    imports: [BrowserModule, StudentModule],
    bootstrap: [AppComponent]
})

export class AppModule {

}