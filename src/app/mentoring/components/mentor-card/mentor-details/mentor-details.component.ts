import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { UtilsService } from '@app/app/manage-learn/core';
import { CommonService } from '@app/app/mentoring/common.service';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss'],
})

export class MentorDetailsComponent {

  mentor:any;
  isAnySlotSelected:boolean = false;
  constructor(private commonService:CommonService,
    private utilsService : UtilsService,
    private router : Router
    ) {
    this.mentor = history.state.mentor;
  }

  changeSelection(slot:any) {
    this.isAnySlotSelected = true;
    this.mentor.slots.forEach((item:any) => {
      if(slot.item.id === item.item.id) {
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


onClick(){
  let userData = localStorage.getItem('mentorAppUser');
  if(!userData){
    this.commonService.openLoginModal();
  }else{
    this.router.navigate(['mentoring/confirm-session'],{state:this.mentor});
  }
}
}
