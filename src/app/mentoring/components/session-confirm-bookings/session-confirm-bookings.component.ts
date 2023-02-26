import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services';
import { CommonService } from '../../common.service';


@Component({
  selector: 'app-session-confirm-bookings',
  templateUrl: './session-confirm-bookings.component.html',
  styleUrls: ['./session-confirm-bookings.component.scss'],
})
export class EnrollmentSessionsComponent implements OnInit {

  mentor:any;
  bookings:any = []
  segmentType = "mentor";
  constructor(private common:CommonService, private headerServ: AppHeaderService) { }

  ngOnInit() {
    this.mentor = history.state.mentor;
    this.headerServ.showHeaderWithBackButton();
    this.common.getMyBookings().
    subscribe((res) => {
        this.bookings = res.data;
    })
  }

  segmentChanged(event) {
    this.segmentType = event.detail.value;
  }

  openLink(link:string) {
    (window as any).cordova.InAppBrowser.open(link, '_blank');
  }

}
