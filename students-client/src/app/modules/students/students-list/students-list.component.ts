import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

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

  private searchTerms = new Subject<string>();

  addStudent() {
    // this.showDetails(new Student());
  }

  deleteStudentById(studentId: number = 0) {
    this._studentService.deleteStudentFromServerById(studentId).subscribe({
      next: () => {
        this.students?.splice(this.students?.findIndex(x => x.id === studentId), 1);
        // this.showDetails(null);
        alert("student removed successfuly!");
      },
      error: (error) => { console.log(error); alert("error has accured :("); }
    });
  }

  editStudent(student: Student) {
    this._router.navigate(['students/details', student.id]);
    // this.showDetails(student);
  }

  // showDetails(student: any) { this.selectedStudent = student; }

  updateStudentToList(studentToAdd: Student) {
    // this.showDetails(null);
    if (this.students.find(s => s.id == studentToAdd.id) == undefined) {
      console.log("in add!! studentToAdd:", studentToAdd);
      this._studentService.addStudentToList(studentToAdd).subscribe({
        next: () => { this.students.push(studentToAdd); },
        error: (error) => { console.log("error in updateStudentToList:", error); alert("can't add :("); }
      });
    }
    else {
      console.log("in edit!! studentToAdd:", studentToAdd);
      this._studentService.editStudentInList(studentToAdd).subscribe({
        next: (data) => { this.students[this.students.findIndex(s => s.id == data.id)] = studentToAdd; },
        error: (error) => { console.log("error in updateStudentToList:", error); alert("can't edit :("); }
      });
    }
  }

  onFocusStudent(student: Student) { this.focusStudent.emit(student); }

  countAbsenceDays(id: number): number { return this._studentService.countAbsenceDays(id); }

  showActiveStudents(isActive: boolean) { this._studentService.getStudentsByActive(isActive).subscribe(data => this.students = data); }

  searchByName(name: string) { this.searchTerms.next(name); }

  listenToSearchByName(): void {
    this.searchTerms.pipe(debounceTime(1000), distinctUntilChanged(),
      switchMap((res) => this._studentService.getStudentsByName(res))).subscribe((res) => { this.students = res; });
  }

  constructor(private _studentService: StudentService, private _router: Router) { }

  ngOnInit(): void {
    this.listenToSearchByName();
    this._studentService.getStudentsFromServer().subscribe({
      next: (data) => { this.students = data; },
      error: (error) => { console.log(error); alert("error while loading students"); }
    });
  }
}
