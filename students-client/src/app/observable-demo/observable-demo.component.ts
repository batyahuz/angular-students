import { Component } from '@angular/core';
import { Observable, filter, from, interval, map } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'observable-demo',
  templateUrl: './observable-demo.component.html'
})
export class ObservableDemoComponent {

  students: Student[] = [];

  studentsNamesObserver: Observable<string> = new Observable((observer) => { this.students?.forEach(s => { observer.next(s.name) }); });//1

  studentsObserver: Observable<Student> = from(this.students);//2

  timer1Observer: Observable<Date> = new Observable((observer) => { setInterval(() => { observer.next(new Date()); }, 1000) });//3
  timer1?: string;

  timer2Observer: Observable<Date> = interval(1000).pipe(map(val => { return new Date() }));//4
  timer2?: string;

  emails1Observer: Observable<string> = new Observable((observer) => { this.students?.forEach(s => { if (s.isActive) observer.next(`${s.name}@gmail.com`) }); });//5
  message: string = "";
  sendEmails() {
    this.emails1Observer.subscribe(val => { console.log("emails option1:", val); });//5
    this.message = "emails were sent successfuly 👌 💌: ";
    from(this.students).pipe(filter(val => val.isActive == true), map(val => `${val.name}@gmail.com`)).subscribe(val => this.message += "  ⚪" + val);//5
  }

  constructor(private _studentService: StudentService) {
    this.studentsNamesObserver.subscribe((val => { console.log("student name: ", val); }));//1
    this.studentsObserver.pipe(map(val => val.name)).subscribe(val => { console.log("student name: ", val); });//2
    this.timer1Observer.subscribe(val => { this.timer1 = val.toLocaleTimeString(); });//3
    this.timer2Observer.subscribe(val => { this.timer2 = val.toLocaleTimeString(); });//4
  }

  ngOnInit(): void {
    this._studentService.getStudentsFromServer().subscribe((data) => {
      this.students = data;
    }, (error) => {
      console.log(error);
      alert("error while loading students");
    })
  }
}
