import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '@app/services/app-header.service';
import { CommonService } from '../common.service';
import { faker } from '@faker-js/faker';
import { LoaderService } from '@app/app/manage-learn/core';

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
    private loader: LoaderService  ) { }

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
  }

​
