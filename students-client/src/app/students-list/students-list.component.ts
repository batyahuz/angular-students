import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

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
    this.showDetails(new Student());
  }

  deleteStudentById(studentId: number = 0) {
    let student = this.students.filter(s => s.id == studentId)[0];
    let index = this.students.indexOf(student);
    if (this.selectedStudent == student)
      this.showDetails(null);
    this.students.splice(index, 1);
  }

  editStudent(student: Student) {
    this.showDetails(student);
  }

  showDetails(student: any) {
    this.selectedStudent = student;
  }

  updateStudentToList(studentToAdd: Student) {
    this.showDetails(null);
    let index = this.students.findIndex(s => s.id == studentToAdd.id);
    if (index == -1) {
      this.addNewStudentToList(studentToAdd);
      alert(`👍 new student was added successpuly 😀`);
    }
    else {
      this.students[index] = studentToAdd;
      alert(`👍 student was updated successpuly 😀`);
    }
  }

  addNewStudentToList(studentToAdd: Student) {
    this.students.push(studentToAdd);
  }

  onFocusStudent(student: Student) {
    this.focusStudent.emit(student);
  }

  countAbsenceDays(id: number): number {
    return this._studentService.countAbsenceDays(id);
  }

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    this._studentService.getStudentsSlowly().then((res) => this.students = res);
  }
}
