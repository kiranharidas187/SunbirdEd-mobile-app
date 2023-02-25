import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/app/manage-learn/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-confirm-session',
  templateUrl: './confirm-session.component.html',
  styleUrls: ['./confirm-session.component.scss'],
})
export class ConfirmSessionComponent implements OnInit {
  itemId;
  fulfillmentId;
  type;

  sessionDetails;

  constructor(private common: CommonService,
    private route: ActivatedRoute,
    private location: Location,
    private toast: ToastService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type']
    });
    this.route.paramMap.subscribe((param) => {
      this.itemId = param.get('itemId');
      this.fulfillmentId = param.get('fulfillmentId');
      this.initCall();
    })
  }

  ngOnInit() { }

  initCall() {
    const payload = {
      itemId: this.itemId,
      fulfillmentId: this.fulfillmentId
    }
    this.common.initCall(payload).subscribe(response => {
      this.sessionDetails = response['data']
    })
  }

  confirmBooking() {
    const payload = {
      "itemId": this.itemId,
      "fulfillmentId": this.fulfillmentId,
      "type": this.type
    }
    this.common.confirmCall(payload).subscribe(data => {
      this.toast.showMessage("Your booking confirmed");
      this.location.back();
    }, error => {
      this.location.back();
      this.toast.showMessage("Your booking failed", 'danger');
    })
  }


}
