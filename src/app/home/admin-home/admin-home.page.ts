import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AppGlobalService,
  AppHeaderService,
  CommonUtilService,
  ContentAggregatorHandler,
  Environment,
  FormAndFrameworkUtilService,
  ImpressionType,
  InteractSubtype,
  PageId,
  SunbirdQRScanner,
  TelemetryGeneratorService,
} from '@app/services';
import { CourseCardGridTypes } from '@project-sunbird/common-consumption';
import { NavigationExtras, Router } from '@angular/router';
import { EventTopics, ProfileConstants, RouterLinks, ViewMore } from '../../app.constant';
import {
  FrameworkService,
  FrameworkDetailsRequest,
  FrameworkCategoryCodesGroup,
  Framework,
  Profile,
  ProfileService,
  ContentAggregatorRequest,
  ContentSearchCriteria,
  CachedItemRequestSourceFrom,
  SearchType,
  InteractType,
  FormService
} from '@project-sunbird/sunbird-sdk';
import { AggregatorPageType } from '@app/services/content/content-aggregator-namespaces';
import { NavigationService } from '@app/services/navigation-handler.service';
import { IonContent as ContentView } from '@ionic/angular';
import { Events } from '@app/util/events';
import { Subscription } from 'rxjs';
import { DbService, LocalStorageService } from '@app/app/manage-learn/core';
import { localStorageConstants } from '@app/app/manage-learn/core/constants/localStorageConstants';
import { UnnatiDataService } from '@app/app/manage-learn/core/services/unnati-data.service';
import { OnTabViewWillEnter } from '@app/app/tabs/on-tab-view-will-enter';
import { FieldConfig } from '@app/app/components/common-forms/field-config';
import { FormConstants } from '@app/app/form.constants';
import { CommonService } from '@app/app/mentoring/common.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit, OnDestroy, OnTabViewWillEnter {
  aggregatorResponse = [];
  courseCardType = CourseCardGridTypes;
  selectedFilter: string;
  concatProfileFilter: Array<string> = [];
  categories: Array<any> = [];
  boards: string;
  medium: string;
  grade: string;
  profile: Profile;
  guestUser: boolean;
  appLabel: string;
  newThemeTimeout: any;
  unformatedMentorList = [
    {
      "mentor": {
        "id": "63f9ed3662820fd9e6beb5b7",
        "name": "Pearl Hegmann DVM",
        "aboutMentor": "With over 20 years of experience in their field, this mentor is a highly respected expert with a wealth of knowledge to share. They are always eager to help others learn and grow, and are known for their patient and supportive approach to mentorship. Whether you're just starting out in the industry or looking to take your skills to the next level, this mentor is an invaluable resource.",
        "professionalExperience": "Chief Scientist | Technical Advisor - CodeWave Solutions",
        "qualification": "Ph.D from BITS Pilani",
        "experience": "8 Years",
        "totalMeetings": "143+",
        "specialistIn": "Frontend Development"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed3723df08285693805e",
            "image": "https://loremflickr.com/640/480/abstract?random=odoqzvgj6x",
            "title": "Innovative Approaches to Student Discipline ClusterNumber1",
            "description": "Innovative Approaches to Student Discipline ClusterNumber1",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "educational-management",
              "name": "Educational Management"
            }
          ],
          "provider": {
            "id": "63f9ed2b62820fd9e6beb590",
            "code": "a3ac943eec9f4341b11bccf974b988f3",
            "name": "MentorMindset"
          },
          "fulfillment": {
            "id": "7ca89237-4be3-4671-81ec-e2e8731a8e05",
            "startTime": "2023-03-01T03:30:00",
            "endTime": "2023-03-01T04:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed2f62820fd9e6beb598",
        "name": "Angelo Huels",
        "aboutMentor": "A true master of their craft, this mentor has spent decades honing their skills and building their knowledge base. They are a sought-after consultant and advisor, known for their ability to tackle even the most difficult challenges with ease. Despite their impressive credentials, they are warm and approachable, always happy to help those who are eager to learn.",
        "professionalExperience": "Senior Consultant | Technical Advisor - MindShift Consulting",
        "qualification": "MBA from BITS Pilani",
        "experience": "21 Years",
        "totalMeetings": "142+",
        "specialistIn": "DevOps"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed2f23df08285693802c",
            "image": "https://loremflickr.com/640/480/abstract?random=x6g05s6fs9",
            "title": "Innovative Approaches to Student Assessment and Evaluation ClusterNumber1",
            "description": "Innovative Approaches to Student Assessment and Evaluation ClusterNumber1",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "educational-management",
              "name": "Educational Management"
            }
          ],
          "provider": {
            "id": "63f9ed2b62820fd9e6beb590",
            "code": "a3ac943eec9f4341b11bccf974b988f3",
            "name": "MentorMindset"
          },
          "fulfillment": {
            "id": "4b8f2b5d-9d48-45ef-b9de-023a0b340d3e",
            "startTime": "2023-03-01T03:30:00",
            "endTime": "2023-03-01T04:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed5862820fd9e6beb65b",
        "name": "Jessie Paucek",
        "aboutMentor": "With over 20 years of experience in their field, this mentor is a highly respected expert with a wealth of knowledge to share. They are always eager to help others learn and grow, and are known for their patient and supportive approach to mentorship. Whether you're just starting out in the industry or looking to take your skills to the next level, this mentor is an invaluable resource.",
        "professionalExperience": "Innovation Strategist | Co-Founder - Quantum Insights, Inc.",
        "qualification": "M.Tech from IIT Madras",
        "experience": "17 Years",
        "totalMeetings": "117+",
        "specialistIn": "Backend Development"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed5923df08285693815d",
            "image": "https://loremflickr.com/640/480/abstract?random=ibeeurb4fj",
            "title": "Innovative Approaches to Student Assessment ClusterNumber4",
            "description": "Innovative Approaches to Student Assessment ClusterNumber4",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "financial-activities",
              "name": "Financial Activities"
            }
          ],
          "provider": {
            "id": "63f9ed4e62820fd9e6beb62a",
            "code": "8c38455d6da14d779ec47952e40c0415",
            "name": "LearnCo"
          },
          "fulfillment": {
            "id": "917afc26-ac68-47b9-8855-15c1531d74b9",
            "startTime": "2023-03-01T04:30:00",
            "endTime": "2023-03-01T05:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        },
        {
          "item": {
            "id": "63f9ed5a23df082856938167",
            "image": "https://loremflickr.com/640/480/abstract?random=4oa5lx37r6",
            "title": "Innovative Approaches to Student Engagement and Motivation ClusterNumber4",
            "description": "Innovative Approaches to Student Engagement and Motivation ClusterNumber4",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "financial-activities",
              "name": "Financial Activities"
            }
          ],
          "provider": {
            "id": "63f9ed4e62820fd9e6beb62a",
            "code": "8c38455d6da14d779ec47952e40c0415",
            "name": "LearnCo"
          },
          "fulfillment": {
            "id": "a2f42376-b68b-47c5-b04f-0d91acfe5e5a",
            "startTime": "2023-03-02T11:30:00",
            "endTime": "2023-03-02T12:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed4e62820fd9e6beb62d",
        "name": "Jeremy Cronin",
        "aboutMentor": "A true master of their craft, this mentor has spent decades honing their skills and building their knowledge base. They are a sought-after consultant and advisor, known for their ability to tackle even the most difficult challenges with ease. Despite their impressive credentials, they are warm and approachable, always happy to help those who are eager to learn.",
        "professionalExperience": "Principal Engineer | Director of R&D - NexGen Innovations",
        "qualification": "M.Tech from BITS Pilani",
        "experience": "25 Years",
        "totalMeetings": "150+",
        "specialistIn": "Backend Development"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed5123df082856938121",
            "image": "https://loremflickr.com/640/480/abstract?random=of7dpfgcga",
            "title": "Innovative Approaches to Student Behavior Management ClusterNumber3",
            "description": "Innovative Approaches to Student Behavior Management ClusterNumber3",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
          ],
          "provider": {
            "id": "63f9ed4e62820fd9e6beb62a",
            "code": "8c38455d6da14d779ec47952e40c0415",
            "name": "LearnCo"
          },
          "fulfillment": {
            "id": "bdaeca63-c505-4cbd-942c-fb60a10297b5",
            "startTime": "2023-03-03T08:30:00",
            "endTime": "2023-03-03T09:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed7c62820fd9e6beb70e",
        "name": "Marta Purdy",
        "aboutMentor": "As a rising star in their industry, this mentor brings a fresh perspective and a wealth of new ideas to the table. They are deeply committed to helping others succeed, and are always on the lookout for opportunities to mentor and guide the next generation of professionals. With a blend of innovation and expertise, this mentor is a valuable asset to anyone looking to make their mark in their field.",
        "professionalExperience": "Innovation Strategist | Director of R&D - MindShift Consulting",
        "qualification": "Ph.D from IIT Kharagpur",
        "experience": "16 Years",
        "totalMeetings": "100+",
        "specialistIn": "Data Science"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed7e23df08285693827a",
            "image": "https://loremflickr.com/640/480/abstract?random=yeeqinfemh",
            "title": "Innovative Approaches to Student Achievement ClusterNumber7",
            "description": "Innovative Approaches to Student Achievement ClusterNumber7",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "educational-leadership",
              "name": "Educational Leadership"
            }
          ],
          "provider": {
            "id": "63f9ed6f62820fd9e6beb6ce",
            "code": "5664b99f00024b859a62e14288b7d63c",
            "name": "EduPilot"
          },
          "fulfillment": {
            "id": "9814279d-3714-4b26-8021-fc68a3cf97d2",
            "startTime": "2023-03-02T11:30:00",
            "endTime": "2023-03-02T12:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed7962820fd9e6beb6ff",
        "name": "Mr Archie Marquardt",
        "aboutMentor": "As a rising star in their industry, this mentor brings a fresh perspective and a wealth of new ideas to the table. They are deeply committed to helping others succeed, and are always on the lookout for opportunities to mentor and guide the next generation of professionals. With a blend of innovation and expertise, this mentor is a valuable asset to anyone looking to make their mark in their field.",
        "professionalExperience": "Executive Director | Co-Founder - ThinkTank Solutions",
        "qualification": "Ph.D from BITS Pilani",
        "experience": "21 Years",
        "totalMeetings": "113+",
        "specialistIn": "Database Management"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed7b23df082856938266",
            "image": "https://loremflickr.com/640/480/abstract?random=brbes98395",
            "title": "Innovative Approaches to Student Motivation and Learning Strategies ClusterNumber6",
            "description": "Innovative Approaches to Student Motivation and Learning Strategies ClusterNumber6",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "administrative-activities",
              "name": "Administrative Activities"
            }
          ],
          "provider": {
            "id": "63f9ed6f62820fd9e6beb6ce",
            "code": "5664b99f00024b859a62e14288b7d63c",
            "name": "EduPilot"
          },
          "fulfillment": {
            "id": "b5efa9a7-417f-4042-a022-b8408f927b62",
            "startTime": "2023-03-03T08:30:00",
            "endTime": "2023-03-03T09:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed4762820fd9e6beb609",
        "name": "Elsie Cruickshank",
        "aboutMentor": "This mentor has spent their entire career working in their field, developing a deep understanding of its complexities and nuances. They are a natural teacher, and take great pleasure in helping others develop their own expertise. Whether you're looking for guidance on a specific project or simply need someone to bounce ideas off of, this mentor is always available and ready to lend a helping hand.",
        "professionalExperience": "Innovation Strategist | Technical Advisor - MindShift Consulting",
        "qualification": "M.E from IIT Bombay",
        "experience": "23 Years",
        "totalMeetings": "135+",
        "specialistIn": "Artificial Intelligence"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed4923df0828569380ea",
            "image": "https://loremflickr.com/640/480/abstract?random=wr4dwdteuc",
            "title": "Innovative Approaches to Student Leadership Development ClusterNumber3",
            "description": "Innovative Approaches to Student Leadership Development ClusterNumber3",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "academic-leadership",
              "name": "Academic Leadership"
            }
          ],
          "provider": {
            "id": "63f9ed3d62820fd9e6beb5d8",
            "code": "e93fc03d8e0d49d6bb8a87ed26f8dc39",
            "name": "KnowledgeCore"
          },
          "fulfillment": {
            "id": "3a3bbb08-13fc-4ee5-a09a-01cbedad12fc",
            "startTime": "2023-03-02T11:30:00",
            "endTime": "2023-03-02T12:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9eda462820fd9e6beb7d7",
        "name": "Mr Gertrude Jenkins",
        "aboutMentor": "This mentor is a true pioneer in their field, having helped to shape the industry in countless ways over the course of their career. They are highly respected for their expertise and leadership, and are always eager to share their insights with others. With a deep understanding of the industry's history and a keen eye for future trends, this mentor is a powerful ally for anyone looking to make their mark in this field.",
        "professionalExperience": "Lead Developer | Technical Advisor - ThinkTank Solutions",
        "qualification": "M.Tech from BITS Pilani",
        "experience": "19 Years",
        "totalMeetings": "77+",
        "specialistIn": "Mobile App Development"
      },
      "slots": [
        {
          "item": {
            "id": "63f9eda523df082856938397",
            "image": "https://loremflickr.com/640/480/abstract?random=zeg6nplsbd",
            "title": "Innovative Approaches to Student Support Services ClusterNumber10",
            "description": "Innovative Approaches to Student Support Services ClusterNumber10",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "financial-improvement",
              "name": "Financial Improvement"
            }
          ],
          "provider": {
            "id": "63f9eda162820fd9e6beb7c4",
            "code": "c23081f87fe940a1a0f72024a518ee07",
            "name": "MentorLink"
          },
          "fulfillment": {
            "id": "5c69959a-018e-4ef7-a604-2715c1fc920e",
            "startTime": "2023-03-01T03:30:00",
            "endTime": "2023-03-01T04:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed6262820fd9e6beb68f",
        "name": "Clifton Abernathy",
        "aboutMentor": "This mentor is a true pioneer in their field, having helped to shape the industry in countless ways over the course of their career. They are highly respected for their expertise and leadership, and are always eager to share their insights with others. With a deep understanding of the industry's history and a keen eye for future trends, this mentor is a powerful ally for anyone looking to make their mark in this field.",
        "professionalExperience": "Principal Engineer | Technical Advisor - MindShift Consulting",
        "qualification": "B.Tech from IIT Madras",
        "experience": "30 Years",
        "totalMeetings": "124+",
        "specialistIn": "Data Science"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed6423df0828569381ad",
            "image": "https://loremflickr.com/640/480/abstract?random=n7ndii6jps",
            "title": "Innovative Approaches to Student Health and Wellness ClusterNumber5",
            "description": "Innovative Approaches to Student Health and Wellness ClusterNumber5",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "academic-improvement",
              "name": "Academic Improvement"
            }
          ],
          "provider": {
            "id": "63f9ed5e62820fd9e6beb67c",
            "code": "a2662443bf81436d8d0228c8606388a0",
            "name": "FutureMinds"
          },
          "fulfillment": {
            "id": "942defdd-752d-48d5-abe9-444405d37b24",
            "startTime": "2023-03-02T10:30:00",
            "endTime": "2023-03-02T11:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed6962820fd9e6beb6ad",
        "name": "Alton Ferry",
        "aboutMentor": "As a rising star in their industry, this mentor brings a fresh perspective and a wealth of new ideas to the table. They are deeply committed to helping others succeed, and are always on the lookout for opportunities to mentor and guide the next generation of professionals. With a blend of innovation and expertise, this mentor is a valuable asset to anyone looking to make their mark in their field.",
        "professionalExperience": "Chief Scientist | Senior Advisor - Quantum Insights, Inc.",
        "qualification": "Ph.D from BITS Pilani",
        "experience": "29 Years",
        "totalMeetings": "132+",
        "specialistIn": "UI/UX Design"
      },
      "slots": [
        {
          "item": {
            "id": "63f9ed6923df0828569381d5",
            "image": "https://loremflickr.com/640/480/abstract?random=pyiptlzfv8",
            "title": "Innovative Approaches to Student Engagement and Participation ClusterNumber5",
            "description": "Innovative Approaches to Student Engagement and Participation ClusterNumber5",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "academic-improvement",
              "name": "Academic Improvement"
            }
          ],
          "provider": {
            "id": "63f9ed5e62820fd9e6beb67c",
            "code": "a2662443bf81436d8d0228c8606388a0",
            "name": "FutureMinds"
          },
          "fulfillment": {
            "id": "7331f86d-951f-462d-ac76-38942877504e",
            "startTime": "2023-03-01T03:30:00",
            "endTime": "2023-03-01T04:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    },
    {
      "mentor": {
        "id": "63f9ed9e62820fd9e6beb7b2",
        "name": "Ms Cathy Nitzsche",
        "aboutMentor": "This mentor is a true pioneer in their field, having helped to shape the industry in countless ways over the course of their career. They are highly respected for their expertise and leadership, and are always eager to share their insights with others. With a deep understanding of the industry's history and a keen eye for future trends, this mentor is a powerful ally for anyone looking to make their mark in this field.",
        "professionalExperience": "Innovation Strategist | Co-Founder - FutureTech Labs",
        "qualification": "Ph.D from IIT Kanpur",
        "experience": "21 Years",
        "totalMeetings": "105+",
        "specialistIn": "DevOps"
      },
      "slots": [
        {
          "item": {
            "id": "63f9eda023df082856938374",
            "image": "https://loremflickr.com/640/480/abstract?random=vlkkdow5dq",
            "title": "Innovative Approaches to Student Success and Achievement ClusterNumber9",
            "description": "Innovative Approaches to Student Success and Achievement ClusterNumber9",
            "price": "0"
          },
          "recommendedFor": [
            {
              "code": "deo",
              "name": "District education officer"
            }
          ],
          "categories": [
            {
              "id": "co-curricular-improvement",
              "name": "Co-curricular Improvement"
            }
          ],
          "provider": {
            "id": "63f9ed9062820fd9e6beb772",
            "code": "1e4a749db30c4dcdb9f1670a400d302e",
            "name": "EduQuest"
          },
          "fulfillment": {
            "id": "d2777d65-ddaa-4369-b7fc-c4864f102918",
            "startTime": "2023-03-02T11:30:00",
            "endTime": "2023-03-02T12:30:00",
            "language": [
              "English"
            ],
            "type": "ONLINE",
            "status": "Live",
            "timeZone": "Asia/Calcutta"
          }
        }
      ]
    }
  ]
  mentorList = [];

  displaySections: any[] = [];
  headerObservable: Subscription;
  @ViewChild('contentView', { static: false }) contentView: ContentView;

  constructor(
    @Inject('FRAMEWORK_SERVICE') private frameworkService: FrameworkService,
    @Inject('PROFILE_SERVICE') private profileService: ProfileService,
    @Inject('FORM_SERVICE') private formService: FormService,
    private commonUtilService: CommonUtilService,
    private router: Router,
    private appGlobalService: AppGlobalService,
    private contentAggregatorHandler: ContentAggregatorHandler,
    private navService: NavigationService,
    private headerService: AppHeaderService,
    private events: Events,
    private formAndFrameworkUtilService: FormAndFrameworkUtilService,
    private telemetryGeneratorService: TelemetryGeneratorService,
    private qrScanner: SunbirdQRScanner,
    private storage: LocalStorageService,
    private unnatiService: UnnatiDataService,
    private db: DbService,
    private common: CommonService
  ) { }

  ngOnInit() {
    try{
      this.common.getMyBookings().subscribe();
    }catch(e) {}
    this.formatMentorList();
    this.getUserProfileDetails();
    this.events.subscribe(AppGlobalService.PROFILE_OBJ_CHANGED, () => {
      this.getUserProfileDetails();
    });
    this.events.subscribe(EventTopics.TAB_CHANGE, (data: string) => {
      if (data === '') {
        this.qrScanner.startScanner(this.appGlobalService.getPageIdForTelemetry());
      }
    });
    this.events.subscribe('onAfterLanguageChange:update', (res) => {
      if (res && res.selectedLanguage) {
        this.fetchDisplayElements();
      }
    });
    this.telemetryGeneratorService.generateImpressionTelemetry(
      ImpressionType.PAGE_LOADED,
      '',
      PageId.ADMIN_HOME,
      Environment.HOME
    );
  }

  formatMentorList() {
    let index = 0;
    for (const mentor of this.unformatedMentorList) {
      const obj = {
        index: index,
        courseLogoUrl: "",
        courseId: mentor?.mentor?.id,
        courseName: mentor?.mentor?.name,
        cardImg: `./assets/profile/${Math.floor((Math.random() * 35) + 1)}.jpg`,
        content: {
          orgDetails: {
            orgName: mentor?.mentor?.professionalExperience
          }
        }
      }
      this.mentorList.push(obj);
      index++
    }
  }

  navigateToMentorDetails(event) {
    const index = event.data.index;
    this.unformatedMentorList[index].mentor['imageUrl'] = event.data.cardImg;
    this.router.navigate(['/mentoring/mentor-details'],{state:{mentor:this.unformatedMentorList[event.data.index]}})
  }

  tabViewWillEnter() {
    this.headerService.showHeaderWithHomeButton(['download', 'notification']);
  }

  async ionViewWillEnter() {
    this.events.subscribe('update_header', () => {
      this.headerService.showHeaderWithHomeButton(['download', 'notification']);
    });
    this.headerObservable = this.headerService.headerEventEmitted$.subscribe((eventName) => {
      this.handleHeaderEvents(eventName);
    });
    this.headerService.showHeaderWithHomeButton(['download', 'notification']);
  }

  getCreateProjectForm() {
    this.storage.getLocalStorage(localStorageConstants.PROJECT_META_FORM).then(
      (resp) => { },
      async (error) => {
        const createProjectMeta: FieldConfig<any>[] = await this.formAndFrameworkUtilService.getFormFields(
          FormConstants.PROJECT_CREATE_META
        );
        if (createProjectMeta.length) {
          this.storage.setLocalStorage(localStorageConstants.PROJECT_META_FORM, createProjectMeta);
        }
        this.getTaskForm();
      }
    );
  }

  getTaskForm() {
    this.storage.getLocalStorage(localStorageConstants.TASK_META_FORM).then(
      (resp) => { },
      async (error) => {
        const createTaskMeta: FieldConfig<any>[] = await this.formAndFrameworkUtilService.getFormFields(
          FormConstants.TASK_CREATE_META
        );
        if (createTaskMeta.length) {
          this.storage.setLocalStorage(localStorageConstants.TASK_META_FORM, createTaskMeta);
        }
      }
    );
  }

  async getUserProfileDetails() {
    this.profileService
      .getActiveSessionProfile({ requiredFields: ProfileConstants.REQUIRED_FIELDS })
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this.getFrameworkDetails();
        this.fetchDisplayElements();
        this.getCreateProjectForm();
      });
    this.guestUser = !this.appGlobalService.isUserLoggedIn();
    this.appLabel = await this.commonUtilService.getAppName();
  }

  navigateToEditProfilePage() {
    if (!this.guestUser) {
      this.router.navigate([`/${RouterLinks.PROFILE}/${RouterLinks.CATEGORIES_EDIT}`]);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          profile: this.profile,
          isCurrentUser: true,
        },
      };
      this.router.navigate([RouterLinks.GUEST_EDIT], navigationExtras);
    }
  }

  ionViewDidLeave() {
    if (this.newThemeTimeout && this.newThemeTimeout.clearTimeout) {
      this.newThemeTimeout.clearTimeout();
    }
  }

  getFrameworkDetails(): void {
    const frameworkDetailsRequest: FrameworkDetailsRequest = {
      frameworkId: this.profile && this.profile.syllabus && this.profile.syllabus[0] ? this.profile.syllabus[0] : '',
      requiredCategories: FrameworkCategoryCodesGroup.DEFAULT_FRAMEWORK_CATEGORIES,
    };
    this.frameworkService
      .getFrameworkDetails(frameworkDetailsRequest)
      .toPromise()
      .then(async (framework: Framework) => {
        this.categories = framework.categories;

        if (this.profile.board && this.profile.board.length) {
          this.boards = this.getFieldDisplayValues(this.profile.board, 0);
        }
        if (this.profile.medium && this.profile.medium.length) {
          this.medium = this.getFieldDisplayValues(this.profile.medium, 1);
        }
        if (this.profile.grade && this.profile.grade.length) {
          this.grade = this.getFieldDisplayValues(this.profile.grade, 2);
        }
      });
  }

  getFieldDisplayValues(field: Array<any>, index: number): string {
    const displayValues = [];
    this.categories[index].terms.forEach((element) => {
      if (field.includes(element.code)) {
        displayValues.push(element.name);
      }
    });
    return this.commonUtilService.arrayToString(displayValues);
  }

  async fetchDisplayElements() {
    const request: ContentAggregatorRequest = {
      interceptSearchCriteria: (contentSearchCriteria: ContentSearchCriteria) => {
        contentSearchCriteria.board = this.profile.board;
        contentSearchCriteria.medium = this.profile.medium;
        contentSearchCriteria.grade = this.profile.grade;
        contentSearchCriteria.searchType = SearchType.SEARCH;
        contentSearchCriteria.mode = 'soft';
        return contentSearchCriteria;
      },
      from: CachedItemRequestSourceFrom.SERVER,
    };

    this.displaySections = await this.contentAggregatorHandler.newAggregate(request, AggregatorPageType.ADMIN_HOME);
    this.displaySections = this.contentAggregatorHandler.populateIcons(this.displaySections);
  }

  onPillClick(event) {
    switch (event.data[0].value.code) {
      case 'program':
        this.router.navigate([RouterLinks.PROGRAM], {});
        this.generateTelemetry('PROGRAM_TILE_CLICKED');
        break;
      case 'project':
        this.router.navigate([RouterLinks.PROJECT], {});
        this.generateTelemetry('PROJECT_TILE_CLICKED');
        break;
      case 'observation':
        this.router.navigate([RouterLinks.OBSERVATION], {});
        this.generateTelemetry('OBSERVATION_TILE_CLICKED');
        break;
      case 'survey':
        this.router.navigate([RouterLinks.SURVEY], {});
        this.generateTelemetry('SURVEY_TILE_CLICKED');
        break;
      case 'report':
        this.router.navigate([RouterLinks.REPORTS], {});
        this.generateTelemetry('REPORTS_TILE_CLICKED');
        break;
      case 'course':
        this.router.navigate([`/${RouterLinks.TABS}/${RouterLinks.COURSES}`]);
        this.generateTelemetry('COURSE_TILE_CLICKED');

    }
  }

  generateTelemetry(interactiveSubtype) {
    this.telemetryGeneratorService.generateInteractTelemetry(
      InteractType.TOUCH,
      InteractSubtype[interactiveSubtype],
      Environment.HOME,
      PageId.ADMIN_HOME
    );
  }

  navigateToViewMoreContentsPage(section) {
    const params: NavigationExtras = {
      state: {
        enrolledCourses: section.data.sections[0].contents,
        pageName: ViewMore.PAGE_COURSE_ENROLLED,
        headerTitle: this.commonUtilService.getTranslatedValue(section.title, ''),
        userId: this.appGlobalService.getUserId(),
      },
    };
    this.router.navigate([RouterLinks.VIEW_MORE_ACTIVITY], params);
  }

  handleHeaderEvents($event) {
    switch ($event.name) {
      case 'download':
        this.redirectToActivedownloads();
        break;
      case 'notification':
        this.redirectToNotifications();
        break;
      default:
        console.warn('Use Proper Event name');
    }
  }

  redirectToActivedownloads() {
    this.router.navigate([RouterLinks.ACTIVE_DOWNLOADS]);
  }

  redirectToNotifications() {
    this.router.navigate([RouterLinks.NOTIFICATION]);
  }

  navigateToDetailPage(event, sectionName) {
    event.data = event.data.content ? event.data.content : event.data;
    const item = event.data;
    const index = event.index;
    const identifier = item.contentId || item.identifier;
    const values = {};
    values['sectionName'] = sectionName;
    values['positionClicked'] = index;
    if (this.commonUtilService.networkInfo.isNetworkAvailable || item.isAvailableLocally) {
      this.navService.navigateToDetailPage(item, { content: item });
    } else {
      this.commonUtilService.presentToastForOffline('OFFLINE_WARNING_ETBUI');
    }
  }

  ionViewWillLeave(): void {
    this.events.unsubscribe('update_header');
    if (this.headerObservable) {
      this.headerObservable.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.events.unsubscribe('onAfterLanguageChange:update');
    if (this.headerObservable) {
      this.headerObservable.unsubscribe();
    }
  }
}
