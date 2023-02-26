import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { UtilsService } from '@app/app/manage-learn/core';
import { CommonService } from '@app/app/mentoring/common.service';
import { AppHeaderService } from '@app/services';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss'],
})

export class MentorDetailsComponent {

  mentor: any;
  selectedSlot
  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private router: Router,
    private headerServ: AppHeaderService
  ) {
    this.mentor = history.state.mentor;
    this.headerServ.showHeaderWithBackButton();
  }

  changeSelection(slot: any) {
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
