import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { UtilsService } from '@app/app/manage-learn/core';
import { CommonService } from '@app/app/mentoring/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss'],
})

export class MentorDetailsComponent {

  mentor:any;
  constructor(private commonService:CommonService,
    private utilsService : UtilsService,
    private router  : Router
    ) {
    this.mentor = history.state.mentor;
    this.mentor.slots[0].isSelected = true;
  }

  changeSelection(slot:any) {
    this.mentor.slots.forEach((item:any) => {
      if(slot.item.id === item.item.id) {
        item.isSelected = true;
      }
      else {
        item.isSelected = false;
      }
    })
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

onClick(){
  let userData = localStorage.getItem('mentorAppUser');
  if(!userData){
    this.utilsService.openLoginModal();
  }else{
    this.router.navigate(['mentoring/confirm-session'],{state:this.mentor});
  }
}
}
