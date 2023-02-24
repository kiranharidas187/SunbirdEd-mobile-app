import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss'],
})
export class MentorCardComponent implements OnInit {

  @Input() cardData: any;
  @Output() cardSelect = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(data){
    this.cardSelect.emit(data)
  }

}
