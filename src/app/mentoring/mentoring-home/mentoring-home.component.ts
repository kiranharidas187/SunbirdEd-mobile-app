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
  segmentType;
  sessions;
  pageConfig;
  searchString;

  constructor(
    private commonService: CommonService,
    private loader: LoaderService,
    private router: Router
  ) { 
    this.pageConfig = this.router.getCurrentNavigation().extras.state;
    this.payload.sessionTitle = this.pageConfig.searchString;
  }

  onSearch(e) {
    this.searchString = e.detail.value;
    this.payload.sessionTitle = this.searchString;
    if(this.segmentType === 'mentor'){
      this.getMentors();
    } else {
      this.getSessions();
    }
  }

  ngOnInit(): void {
    // this.getMentors()
   }


  segmentChanged(event) {
    this.segmentType = event.detail.value;
    if(this.segmentType === 'mentor'){
      this.getMentors();
    } else {
      this.getSessions();
    }
  }

   ionViewWillEnter() {
    this.searchString = this.pageConfig.searchString;
    this.segmentType = "mentor";
  }

  getMentors() {
    this.loader.startLoader();
    this.payload.type = "mentor"
    this.commonService.searchApi(this.payload)
      .subscribe((res) => {
        this.loader.stopLoader();
        for (const item of res.data.mentors) {
          // item.mentor.imageUrl = faker.image.people(500, 500, true)
          item.mentor.imageUrl= `./assets/profile/${Math.floor((Math.random() * 35) + 1)}.jpg`
        }
        this.mentors = res.data.mentors
      }, error => {
        this.loader.stopLoader();

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
      }, error => {
        this.loader.stopLoader();
      })
  }

  goToSessionDetails(session) {
    this.router.navigate(['/mentoring/session-details/'+ session?.item?.id])
  }
}

