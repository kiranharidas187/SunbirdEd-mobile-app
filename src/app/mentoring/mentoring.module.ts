import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MentoringHomeComponent } from './mentoring-home/mentoring-home.component';
import { MentorCardComponent } from './components/mentor-card/mentor-card.component';
import { ConfirmSessionComponent } from './components/confirm-session/confirm-session.component';
import { MentorDetailsComponent } from './components/mentor-card/mentor-details/mentor-details.component';
import { MentorSessionCardComponent } from './components/mentor-card/mentor-session-card/mentor-session-card.component';
<<<<<<< HEAD
import { SessionConfirmBookingsComponent } from './components/session-confirm-bookings/session-confirm-bookings.component';
=======
import { SessionDetailsComponent } from './session-details/session-details.component';
>>>>>>> kiran/hackathon

const routes: Routes = [
  {
    path:"",
    component:MentoringHomeComponent
  },
  {
    path:"confirm-session",
    component:ConfirmSessionComponent
  },{
    path:"mentor-details",
    component:MentorDetailsComponent
  },
  {
<<<<<<< HEAD
    path:"confirm-booking",
    component:SessionConfirmBookingsComponent
=======
    path:'session-details/:sessionId',
    component: SessionDetailsComponent
>>>>>>> kiran/hackathon
  }
]

@NgModule({
<<<<<<< HEAD
  declarations: [MentoringHomeComponent, MentorCardComponent, MentorDetailsComponent,ConfirmSessionComponent, MentorSessionCardComponent,SessionConfirmBookingsComponent],
=======
  declarations: [
    MentoringHomeComponent, 
    MentorCardComponent, 
    MentorDetailsComponent,
    ConfirmSessionComponent, 
    MentorSessionCardComponent,
    SessionDetailsComponent
  ],
>>>>>>> kiran/hackathon
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild(routes)]
})
export class MentoringModule { }
