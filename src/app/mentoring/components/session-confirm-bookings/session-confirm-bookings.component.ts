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
    },
    {
        "orderId": "6c25d01a-341c-4ec8-b165-93585012679e",
        "type": "session",
        "details": {
            "item": {
                "id": "63f1ebdb23df082856936515",
                "image": "https://loremflickr.com/640/480/abstract?random=cozijbxqte",
                "title": "Class Room Management Level Tags Test 2",
                "description": "A level Tags Test 2 session on class room management for state schools and colleges.",
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
                "aboutMentor": "This mentor has spent their entire career working in their field, developing a deep understanding of its complexities and nuances. They are a natural teacher, and take great pleasure in helping others develop their own expertise. Whether you're looking for guidance on a specific project or simply need someone to bounce ideas off of, this mentor is always available and ready to lend a helping hand.",
                "professionalExperience": "Principal Engineer | Director of R&D - FutureTech Labs",
                "qualification": "B.Tech from IIT Kanpur",
                "experience": "15 Years",
                "totalMeetings": "87+",
                "specialistIn": "Backend Development"
            },
            "provider": {
                "id": "63d93aea62820fd9e6be9d1b",
                "code": "org7",
                "name": "ShikshalokamSeven"
            },
            "fulfillment": {
                "id": "90b1be26-2135-47b7-9c2c-fc8f16b8ddd5",
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
        "joinLink": "https://dev.elevate-apis.shikshalokam.org/dsep-mentoring/v1/sessions/join/63f1ebdb23df082856936515?user=63f8b07e223d5271a69dbcb6&name=Ramkumar"
    }
]
  segmentType = "mentor";
  constructor() { }

  ngOnInit() {
    this.mentor = history.state.mentor;
  }

  segmentChanged(event) {
    this.segmentType = event.detail.value;
  }

  openLink(link:string) {
    (window as any).cordova.InAppBrowser.open(link, '_blank');
  }

  

}
