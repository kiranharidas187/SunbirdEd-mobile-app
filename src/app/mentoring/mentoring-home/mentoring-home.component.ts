import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services/app-header.service';
import { CommonService } from '../common.service';
import { faker } from '@faker-js/faker';
import { LoaderService } from '@app/app/manage-learn/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentoring-home',
  templateUrl: './mentoring-home.component.html',
  styleUrls: ['./mentoring-home.component.scss'],
})
export class MentoringHomeComponent implements OnInit {

  mentors;
  payload = {
    "sessionTitle": "management",
    "type": "mentor"
  }
  segmentType = "mentor";
  sessions;

  constructor(
    private headerService: AppHeaderService,
    private commonService: CommonService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  segmentChanged(event) {
    this.segmentType = event.detail.value;
    if(this.segmentType === 'mentor'){
      this.getMentors();
    } else {
      this.getSessions();
    }
  }

  async ionViewWillEnter() {
    this.getMentors()
  }

  getMentors() {
    this.loader.startLoader();
    this.payload.type = "mentor"
    this.commonService.searchApi(this.payload)
      .subscribe((res) => {
        this.loader.stopLoader();
        for (const item of res.data.mentors) {
          item.mentor.imageUrl = faker.image.people(500, 500, true)
        }
        this.mentors = res.data.mentors
      })
  }

  getSessions() {
    this.loader.startLoader();
    this.payload.type = "session"
    this.commonService.searchApi(this.payload)
      .subscribe((res) => {
        this.loader.stopLoader();
        this.sessions = res?.data?.sessions;
        console.log(res)
      })
  }

  goToSessionDetails(session) {
    this.router.navigate(['/mentoring/session-details/'+ session?.item?.id])
  }
}

