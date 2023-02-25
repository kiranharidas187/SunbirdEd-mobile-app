import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mentor-session-card',
  templateUrl: './mentor-session-card.component.html',
  styleUrls: ['./mentor-session-card.component.scss'],
})
export class MentorSessionCardComponent implements OnInit {

  @Input() session:any
  @Output() onCardCickEvent =  new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onCardClick() {
    this.onCardCickEvent.emit(this.session)
  }

}
