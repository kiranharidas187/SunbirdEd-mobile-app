import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss'],
})
export class MentorCardComponent implements OnInit {

  @Input() cardData: any;


  constructor() { }

  ngOnInit() {
   console.log(this.cardData);
    
  }

}
