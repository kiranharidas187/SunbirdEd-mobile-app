import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss'],
})
export class MentorCardComponent implements OnInit {

  @Input() cardData: any;
  @Output() cardSelect = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit() {}

  openMentorDetails() {
    this.router.navigate(['/mentoring/mentor-details'],{state:{mentor:this.cardData}})
  }

}
