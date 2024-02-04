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
    // let index = this.students.indexOf(student);
    // if (this.selectedStudent == student)
    // this.students.splice(index, 1);
  }

  editStudent(student: Student) { this.showDetails(student); }

  showDetails(student: any) { this.selectedStudent = student; }

  updateStudentToList(studentToAdd: Student) {
    this.showDetails(null);
    this._studentService.addStudentToList(studentToAdd).subscribe(data => {
      if (data == true)
        this.students.push(studentToAdd);
      else
        this.students[this.students.findIndex(s => s.id == studentToAdd.id)] = studentToAdd;
    }, error => { console.log(error); alert("can't add :("); });
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

    this.studentNames.push(name);
    console.log("this.studentNames=", this.studentNames);
    distinctUntilChanged();
    this._studentService.getStudentsByName(name).pipe(debounceTime(1000)).subscribe(data => this.students = data);
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
