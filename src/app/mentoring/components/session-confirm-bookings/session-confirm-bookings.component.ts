import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-confirm-bookings',
  templateUrl: './session-confirm-bookings.component.html',
  styleUrls: ['./session-confirm-bookings.component.scss'],
})
export class SessionConfirmBookingsComponent implements OnInit {

  mentor:any;
  bookings:any = [
    {
        "orderId": "0fb31111-23ca-4694-b4d8-687649c655e9",
        "type": "mentor",
        "details": {
            "item": {
                "id": "63f1ec1e23df082856936529",
                "image": "https://loremflickr.com/640/480/abstract?random=rx0aqrh044",
                "title": "Class Room Management Level Tags Test 6",
                "description": "A level Tags Test 6 session on class room management for state schools and colleges.",
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
                    "id": "infrastructure-management",
                    "name": "Infrastructure Management"
                }
            ],
            "mentor": {
                "id": "63f0ceac62820fd9e6be9e9b",
                "name": "joffin Mentor Fourteen",
                "aboutMentor": "With a career spanning multiple decades, this mentor is a true veteran of their industry. They have seen it all, and have a wealth of stories and insights to share. They are passionate about passing on their knowledge and experience to others, and take great pride in helping others achieve their goals. Whether you're a newcomer to the industry or a seasoned pro, this mentor is an invaluable source of wisdom and guidance.",
                "professionalExperience": "Senior Consultant | Director of R&D - FutureTech Labs",
                "qualification": "M.Tech from NID Ahmedabad",
                "experience": "13 Years",
                "totalMeetings": "124+",
                "specialistIn": "Machine Learning"
            },
            "provider": {
                "id": "63d93aea62820fd9e6be9d1b",
                "code": "org7",
                "name": "ShikshalokamSeven"
            },
            "fulfillment": {
                "id": "e45e438f-ff95-4ce5-a3f9-93037b5dbc30",
                "startTime": "2023-02-19T23:23:16",
                "endTime": "2023-02-20T01:23:16",
                "language": [
                    "English"
                ],
                "type": "ONLINE",
                "status": "Live",
                "timeZone": "Asia/Calcutta"
            }
        },
        "status": "active",
        "joinLink": "https://dev.elevate-apis.shikshalokam.org/dsep-mentoring/v1/sessions/join/63f1ec1e23df082856936529?user=63f8b07e223d5271a69dbcb6&name=Ramkumar"
    }
  ]
  constructor() { }

  ngOnInit() {
    this.mentor = history.state.mentor;
  }

}
