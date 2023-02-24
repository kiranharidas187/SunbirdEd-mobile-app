import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MentoringHomeComponent } from './mentoring-home/mentoring-home.component';
import { MentorCardComponent } from './components/mentor-card/mentor-card.component';
import { MentorDetailsComponent } from './components/mentor-card/mentor-details/mentor-details.component';
import { MentorSessionCardComponent } from './components/mentor-card/mentor-session-card/mentor-session-card.component';

const routes: Routes = [
  {
    path:"",
    component:MentoringHomeComponent
  },
  {
    path:"mentor-details",
    component:MentorDetailsComponent
  }
]


@NgModule({
  declarations: [MentoringHomeComponent, MentorCardComponent, MentorDetailsComponent, MentorSessionCardComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild(routes),  ]
})
export class MentoringModule { }
