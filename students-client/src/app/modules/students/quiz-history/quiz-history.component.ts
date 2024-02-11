import { Component, Input } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss']
})

export class QuizHistoryComponent {

  @Input() quizes: Quiz[] | undefined;
  @Input() id: number | undefined;
  average: number | undefined;

  getAverage() {
    if (this.id != undefined)
      this._studentService.getAverageById(this.id).then((res) => this.average = res)
  }



  constructor(private _studentService: StudentService) { }
  ngOnInit() { }
}
