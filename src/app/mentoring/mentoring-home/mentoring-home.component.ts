import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services/app-header.service';
import { CommonService } from '../common.service';
import { faker } from '@faker-js/faker';
import { LoaderService } from '@app/app/manage-learn/core';

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
    private commonService:CommonService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {}

  async ionViewWillEnter() {
    this.headerService.showHeaderWithBackButton();
    this.loader.startLoader();
    this.commonService.getMentors(this.payload)
    .subscribe((res) => {
      this.loader.stopLoader();
      for (const item of res.data.mentors) {
        item.mentor.imageUrl = faker.image.people( 500, 500,  true)
      }
      this.mentors = res.data.mentors
    })
  }
  }
​
