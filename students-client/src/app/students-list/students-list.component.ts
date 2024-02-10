import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {

  students!: Student[];

  @Output()
  focusStudent: EventEmitter<Student> = new EventEmitter();

  selectedStudent: Student | undefined;

  addStudent() {
    var newStudent: Student = new Student();
    newStudent.id = -1;
    // var newStudent: Student = {
    //   "id": -1,
    //     "tz": 111,
    //     "name": "name",
    //     "address": "address my :)",
    //     "phone": "434134",
    //     "isActive": true,
    //     "average": 10.1,
    //     "dateLeft": new Date(),
    //     "proffetional": {
    //       "id": 0,
    //       "name": 0,
    //       "description": "Angular"
    //     },
    //     "year": "First"
    // };
    this.showDetails(newStudent);
  }

  deleteStudentById(studentId: number = 0) {
    this._studentService.deleteStudentFromServerById(studentId).subscribe(data => {
      this.showDetails(null);
      alert("student removed successfuly!");
    }, error => {
      console.log(error);
      alert("error has accured :(");
    });
  }

  editStudent(student: Student) { this.showDetails(student); }

  showDetails(student: any) { this.selectedStudent = student; }

  updateStudentToList(studentToAdd: Student) {
    this.showDetails(null);
    if (this.students.find(s => s.id == studentToAdd.id) == undefined) {
      console.log("in add!! studentToAdd:", studentToAdd);
      this._studentService.addStudentToList(studentToAdd).subscribe(data => {
        this.students.push(studentToAdd);
      }, error => { console.log("error in updateStudentToList:", error); alert("can't add :("); });
    }
    else {
      console.log("in edit!! studentToAdd:", studentToAdd);
      this._studentService.editStudentInList(studentToAdd).subscribe((data) => {
        this.students[this.students.findIndex(s => s.id == data.id)] = studentToAdd;
      }, error => { console.log("error in updateStudentToList:", error); alert("can't edit :("); });
    }
  }

  onFocusStudent(student: Student) { this.focusStudent.emit(student); }

  countAbsenceDays(id: number): number { return this._studentService.countAbsenceDays(id); }

  showActiveStudents(isActive: boolean) { this._studentService.getStudentsByActive(isActive).subscribe(data => this.students = data); }

  studentNames: string[] = [];
  searchByName(name: string) {
    /* studentName: string = '';
    private searchTerms = new Subject<string>();
    g(): void {
        this.searchTerms.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((term: string) => this._studentService.getStudentsFromServerByName(this.studentName)),
        ).subscribe(d => this.students = d);
    }

    getStudentByName(): void {
        this.searchTerms.next(this.studentName);
    }*/
    //???????????????????????????????????
    //TODO

    // this.studentNames.push(name);
    // console.log("this.studentNames=", this.studentNames);
    // distinctUntilChanged();
    // this._studentService.getStudentsByName(name).pipe(debounceTime(1000)).subscribe(data => this.students = data);
    this._studentService.getStudentsByName(name).subscribe(data => this.students = data)
  }

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    // this._studentService.getStudentsSlowly().then((res) => this.students = res);
    this._studentService.getStudentsFromServer().subscribe(data => {
      this.students = data;
    }, error => {
      console.log(error);
      alert("error while loading students");
    });
  }
}
