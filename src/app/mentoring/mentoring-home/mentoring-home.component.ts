import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services/app-header.service';
import { CommonService } from '../common.service';
import { faker } from '@faker-js/faker';
import { LoaderService, UtilsService } from '@app/app/manage-learn/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentoring-home',
  templateUrl: './mentoring-home.component.html',
  styleUrls: ['./mentoring-home.component.scss'],
})
export class MentoringHomeComponent implements OnInit {

  mentors;
  payload = {
    "sessionTitle": "management",
    "type":"mentor"
  }
  private _headerConfig = {
    showHeader: true,
    showBurgerMenu: false,
    pageTitle: '',
    actionButtons: [] as string[]
  };

  constructor(
    private headerService: AppHeaderService,
    private commonService:CommonService,
    private loader: LoaderService,
    private utilsService : UtilsService,
    private router : Router
  ) { }

  ngOnInit(): void {}

  async ionViewWillEnter() {
    this.headerService.showHeaderWithBackButton();
    this._headerConfig.pageTitle = "Mentors";
    this.headerService.updatePageConfig(this._headerConfig);
    this.loader.startLoader();
    this.commonService.getMentors(this.payload)
    .subscribe((res) => {
      this.loader.stopLoader();
      for (const item of res.data.mentors) {
        item.mentor.imageUrl = faker.image.people( 500, 500,  true)
      }
      this.mentors = res.data.mentors
    })
  }
  onClick(data){
    let userData = localStorage.getItem('mentorAppUser');
    if(!userData){
      this.utilsService.openLoginModal();
    }else{
      this.router.navigate(['mentoring/confirm-session'],{state:data});
    }
  }
  }

​
