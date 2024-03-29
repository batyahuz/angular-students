import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { APP_PROFFETIONALS, P, Proffetional } from '../models/proffetional.model';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  proffetionals: Proffetional[] = APP_PROFFETIONALS;

  b = Boolean;

  private _student?: Student;
  public get student(): Student | undefined { return this._student; }
  // @Input()
  public set student(value: Student | undefined) {
    this._student = value;
    if (this.student != undefined) {
      this.studentForm = new FormGroup({
        "id": new FormControl(this.student.id),
        "tz": new FormControl(this.student.tz, [Validators.required, Validators.minLength(3)]),
        "name": new FormControl(this.student.name, [Validators.required, Validators.minLength(2)]),
        "address": new FormControl(this.student.address, [Validators.required]),
        "phone": new FormControl(this.student.phone, [Validators.required]),
        "isActive": new FormControl(this.student.isActive),
        "average": new FormControl(this.student.average, [Validators.required, Validators.max(100), Validators.min(1)]),
        "dateLeft": new FormControl(this.student.dateLeft),
        "proffetional": new FormControl(this.student.proffetional, [Validators.required]),
        "year": new FormControl(this.student.year, [Validators.required])
      });
      console.log("this.student.isActive", this.student.isActive);
      console.log("this.student.dateLeft", this.student.dateLeft);
      console.log("this.student.id", this.student.id);
      console.log("this.student.year", this.student.year);
    }
  }

  studentForm: FormGroup = new FormGroup({});

  private _totalAbsenceDays?: number;
  public get totalAbsenceDays(): number | undefined { return this._totalAbsenceDays; }
  public set totalAbsenceDays(v: number) { this._totalAbsenceDays = v; }

  private _absenceDate?: Date;
  public get absenceDate(): Date | undefined { return this._absenceDate; }
  public set absenceDate(v: Date) { this._absenceDate = v; }

  @Output()
  onSaveNewStudent: EventEmitter<Student> = new EventEmitter();

  saveNewStudent() {
    this._student = this.studentForm.value;
    if (this.totalAbsenceDays && this.totalAbsenceDays > 0 && this.absenceDate)
      this.student?.absences?.push({ numberDays: this.totalAbsenceDays, startAbsenceDate: this.absenceDate });
    this.onSaveNewStudent.emit(this._student);
  }

  countAbsenceDays(id: number): number { return this._studentService.countAbsenceDays(id); }

  constructor(private _studentService: StudentService, private _ac: ActivatedRoute) { }

  ngOnInit(): void {
    this._ac.paramMap.subscribe(paramMap => {
      console.log("in this._ac.paramMap.subscribe(paramMap => {");

      if (paramMap.has("id")) {

        console.log("in this._ac.paramMap.subscribe(paramMap => { -------------- in if :)");
        let studentId = (paramMap.get("id"));
        console.log('studentId ', studentId);
        let id: number = +(studentId || "");
        console.log('id ', id);
        this.student = this._studentService.getStudentByIdFromServer(id);
      }
    })
  }

}
