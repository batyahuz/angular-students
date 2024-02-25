import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { StudentModule } from '../students/students.module';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { StudentsListComponent } from '../students/students-list/students-list.component';
import { StudentDetailsComponent } from '../students/student-details/student-details.component';

const ROUTES: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'students/list', component: StudentsListComponent },
  { path: 'students/details/:id', component: StudentDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
