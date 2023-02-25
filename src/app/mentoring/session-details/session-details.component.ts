import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { faker } from '@faker-js/faker';
import { LoaderService } from '@app/app/manage-learn/core';


@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {

  sessionId;
  sessionDetails;
  mentorName =  faker.image.avatar()


  constructor( 
    private route: ActivatedRoute, 
    private common: CommonService,
    private loader: LoaderService) { 
    this.route.paramMap.subscribe((param) => {
      this.sessionId = param.get('sessionId')
    })
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.getSessionDetails()
  }

  getSessionDetails() {
    this.common.selectItem(this.sessionId).subscribe(result => {
      this.sessionDetails = result['data'];
    })
  }

  rsvpSessionClick() {
    // this.loader.startLoader();
    this.common.checkForLogin();

  }

}
