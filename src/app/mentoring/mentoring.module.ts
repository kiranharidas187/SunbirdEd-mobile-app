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
import { SessionConfirmBookingsComponent } from './components/session-confirm-bookings/session-confirm-bookings.component';
import { SessionDetailsComponent } from './session-details/session-details.component';

const routes: Routes = [
  {
    path:"",
    component:MentoringHomeComponent
  },
  {
    path:"confirm-session/:itemId/:fulfillmentId",
    component:ConfirmSessionComponent
  },{
    path:"mentor-details",
    component:MentorDetailsComponent
  },
  {
    path:'session-details/:sessionId',
    component: SessionDetailsComponent
  },
  {
    path:"confirm-booking",
    component:SessionConfirmBookingsComponent
  }
]

@NgModule({
  declarations: [
    MentoringHomeComponent, 
    MentorCardComponent, 
    MentorDetailsComponent,
    ConfirmSessionComponent, 
    MentorSessionCardComponent,
    SessionDetailsComponent,
    SessionConfirmBookingsComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild(routes)]
})
export class MentoringModule { }
