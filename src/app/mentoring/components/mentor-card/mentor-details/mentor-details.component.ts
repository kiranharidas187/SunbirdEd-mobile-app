import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { ToastService, UtilsService } from '@app/app/manage-learn/core';
import { CommonService } from '@app/app/mentoring/common.service';
import { AppHeaderService } from '@app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss'],
})

export class MentorDetailsComponent {

  mentor: any;
  selectedSlot;
  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private router: Router,
    private headerServ: AppHeaderService,
    private toast: ToastService
  ) {
    this.mentor = history.state.mentor;
    this.headerServ.showHeaderWithBackButton();
  }

  ionViewWillEnter() {
    this.selectedSlot = null;
  }

  changeSelection(slot: any) {
    const userToken = JSON.parse(localStorage.getItem('mentorAppUser'));
    if(!userToken) {
      const payload = {
        itemId: slot.item.id,
        fulfillmentId: slot.fulfillment.id,
        type: 'mentor'
      }
      this.commonService.checkForLogin();
      return
    }

    if(this.commonService.getSessionJoinLink(slot.item.id)){
      this.toast.showMessage("You have already booked this slot.", "danger")
      return null
    }
    this.selectedSlot = slot;
    this.mentor.slots.forEach((item: any) => {
      if (slot.item.id === item.item.id) {
        item.isSelected = true;
      }
      else {
        item.isSelected = false;
      }
    })
  }

  gotoBooking() {
    this.router.navigate(['/mentoring/confirm-booking'])
  }

  //   getDuration(start,end) {
  //     // start time and end time
  //     let startTime = moment(start);
  //     let endTime = moment(end);

  //     // calculate total duration
  //     let duration:any = moment.duration(endTime.diff(startTime));

  //     // duration in hours
  //     let hours = parseInt(duration.asHours());

  //     // duration in minutes
  //     let minutes = parseInt(duration.asMinutes()) % 60;
  //     console.log(hours,minutes)
  //     // return `${hours}`
  //     return '45 Mins'
  //   }

  onBookClick() {
    // let userData = localStorage.getItem('mentorAppUser');
    // if (!userData) {
    //   this.commonService.openLoginModal();
    // } else {
    //   this.router.navigate(['mentoring/confirm-session'], { state: this.mentor });
    // }
    const payload = {
      itemId: this.selectedSlot.item.id,
      fulfillmentId: this.selectedSlot.fulfillment.id,
      type: 'mentor'
    }
    this.commonService.checkForLogin(payload);
  }
}
