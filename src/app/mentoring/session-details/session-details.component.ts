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
  mentorName =  faker.image.avatar();
  sessionJoinLink;


  constructor( 
    private route: ActivatedRoute, 
    private common: CommonService,
    private loader: LoaderService) { 
    this.route.paramMap.subscribe((param) => {
      this.sessionId = param.get('sessionId')
    })
  }

  ngOnInit() {
    this.sessionJoinLink = this.common.getSessionJoinLink(this.sessionId);
  }

  async ionViewWillEnter() {
    this.getSessionDetails()
  }

  getSessionDetails() {
    this.loader.startLoader();
    this.common.selectItem(this.sessionId).subscribe(result => {
      this.loader.stopLoader();
      this.sessionDetails = result['data'];
    },error =>{
      this.loader.stopLoader();
    })
  }

  rsvpSessionClick() {
    // this.loader.startLoader();
    const payload = {
      itemId:this.sessionDetails.item.id,
      fulfillmentId: this.sessionDetails.fulfillment.id,
      type: 'session'
    }
    this.common.checkForLogin(payload);

  }

  joinCall() {
    this.common.openLink(this.sessionJoinLink);
  }

}
