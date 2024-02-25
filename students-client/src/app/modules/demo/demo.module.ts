import { NgModule } from "@angular/core";
import { ObservableDemoComponent } from "./observable-demo/observable-demo.component";
import { StudentService } from "../students/student.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [ObservableDemoComponent],
    imports: [HttpClientModule],
    providers: [StudentService],
    exports: [ObservableDemoComponent]
})
export class DemoModule {

}