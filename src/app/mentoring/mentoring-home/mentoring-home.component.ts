import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services/app-header.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-mentoring-home',
  templateUrl: './mentoring-home.component.html',
  styleUrls: ['./mentoring-home.component.scss'],
})
export class MentoringHomeComponent implements OnInit {

  mentors;
  payload = {
    "sessionTitle": "management",
    "type":"mentor"
  }
  constructor(
    private headerService: AppHeaderService,
    private commonService:CommonService

  ) { }

  ngOnInit(): void {
    console.log("mentronig home")
  }

  async ionViewWillEnter() {
    this.headerService.showHeaderWithBackButton();
    this.commonService.getMentors(this.payload)
    .subscribe((res) => {
      this.mentors = res.data.mentors
   
    })
  }
  }
​
