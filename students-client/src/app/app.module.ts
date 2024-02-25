import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { DemoModule } from "./modules/demo/demo.module";
import { StudentService } from "./modules/students/student.service";

@NgModule({
    declarations: [AppComponent, HomePageComponent, PageNotFoundComponent],
    providers: [],
    imports: [BrowserModule, AppRoutingModule, DemoModule],
    bootstrap: [AppComponent]
})

export class AppModule {

}