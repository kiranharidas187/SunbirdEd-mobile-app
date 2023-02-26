import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastService } from '../manage-learn/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private localNotification: LocalNotifications,
    private alertCtrl: AlertController) { }

  baseUrl = "https://dev.elevate-apis.shikshalokam.org/osl-bap";
  initPayload;
  enrolledSessions = [];

  searchApi(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/dsep/search`, payload)
  }

  login(payload): Observable<any> {
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/login', payload)
  }

  signupApi(payload): Observable<any> {
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/signup', payload)
  }

  addProfileApi(payload): Observable<any> {
    const userToken = JSON.parse(localStorage.getItem('mentorAppUser'));
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/profile/add', payload, {
      headers: {
        'Authorization': `Bearer ${userToken.accessToken}`
      }
    })
  }

  getMentorDetails(id = '63f1ebea23df08285693651a'): Observable<any> {
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/dsep/select', { itemId: id })
  }

  selectItem(itemId) {
    const payload = {
      "itemId": itemId
    }
    return this.http.post(`${this.baseUrl}/dsep/select`, payload)
  }

  bapInitCall(payload) {
    return this.http.post(`${this.baseUrl}/dsep/init`, payload)
  }

  checkForLogin(initPayload?) {
    this.initPayload = initPayload;
    const mentorUSerDetails : any= JSON.parse(localStorage.getItem('mentorAppUser'));
    if (!mentorUSerDetails) {
      this.openLoginModal();
    } else {
      const hourDiff  = (Date.now()-  mentorUSerDetails.loginTime) / 1000 / 60 / 60;
      if(hourDiff > 20){
        this.action(mentorUSerDetails.email);
      }else{
        this.navigateToConfirmPage();
      }
    }
  }

  async openLoginModal() {
    const alert = await this.alertCtrl.create({
      header: 'confirm email',
      cssClass: 'attachment-delete-alert',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Submit',
          cssClass: 'alert-button-confirm',
          handler: (data) => {
            this.action(data[0]);
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Please enter your email',
        }
      ],
    });

    await alert.present();
  }
  navigateToConfirmPage() {
    this.initPayload ? this.router.navigate([`mentoring/confirm-session/${this.initPayload.itemId}/${this.initPayload.fulfillmentId}`], { queryParams: { type: this.initPayload.type } }) : this.toast.openToast("Please continue booking.");
  }

  action(data) {
    let payload = {
      "email": data,
      "password": "testpassword"
    }
    this.login(payload).subscribe(success => {
      if (success.status) {
        success.data.loginTime = Date.now();
        localStorage.setItem('mentorAppUser', JSON.stringify(success.data));
        this.navigateToConfirmPage();
      } else {
        this.signup(payload);
      }
    }, error => {
      this.signup(payload);
    })
  }
  signup(payload) {
    this.signupApi(payload).subscribe(response => {
      if (response.status) {
        response.data.loginTime = Date.now();
        localStorage.setItem('mentorAppUser', JSON.stringify(response.data));
        let data = {
          name: payload.email
        }
        this.addProfile(data);
      }
    }, error => {
      console.log(error, "error");
    })
  }
  addProfile(name) {
    this.addProfileApi(name).subscribe(res => {
      if (res.status) {
        this.navigateToConfirmPage();
      } else {
        this.toast.showMessage(res.message, 'danger');
      }
    }, error => {
    })
  }

  initCall(payload) {

    const userToken = JSON.parse(localStorage.getItem('mentorAppUser'));
    return this.http.post(`${this.baseUrl}/dsep/init`, payload, {
      headers: {
        'Authorization': `Bearer ${userToken.accessToken}`
      }
    })
  }

  confirmCall(payload) {
    const userToken = JSON.parse(localStorage.getItem('mentorAppUser'));
    return this.http.post(`${this.baseUrl}/dsep/confirm`, payload, {
      headers: {
        'Authorization': `Bearer ${userToken.accessToken}`
      }
    }).pipe(map(data => {
      this.getMyBookings();
      return data
    }))
  }

  getMyBookings(): Observable<any> {
    const userToken = JSON.parse(localStorage.getItem('mentorAppUser'));
    if (userToken) {
      return this.http.get(`${this.baseUrl}/get-confirmed-list`, {
        headers: {
          'Authorization': `Bearer ${userToken.accessToken}`
        }
      }).pipe(map(data => {
        this.enrolledSessions = data['data'] ? data['data'] : [];
        return data
      }))
    }
  }

  scheduleNotification(title: string, content: string, time: string, minutesBefore: number, id: any) {
    this.localNotification.schedule({
      id: (Math.random()*100000),
      title: title,
      text: content,
      trigger: { at:this.subtractMinutes(time,minutesBefore) }
    })
  }

  subtractMinutes(date, minutes) {
    date = new Date()
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  getSessionJoinLink(id) {
    for (const session of this.enrolledSessions) {
      if (id === session?.details?.item?.id) {
        return session?.joinLink
      }
    }
    return null
  }

  openLink(link: string) {
    (window as any).cordova.InAppBrowser.open(link, '_blank');
  }
}
