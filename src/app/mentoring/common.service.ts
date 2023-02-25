import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastService } from '../manage-learn/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private alertCtrl: AlertController) { }

  baseUrl = "https://dev.elevate-apis.shikshalokam.org/osl-bap"

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
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/profile/add', payload,{
      headers:{
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

  checkForLogin() {
    const mentorUSerDetails =   localStorage.getItem('mentorAppUser');
    console.log(mentorUSerDetails)
    if(!mentorUSerDetails) {
      this.openLoginModal();
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

  action(data) {
    let payload = {
      "email": data,
      "password": "testpassword"
    }
    this.login(payload).subscribe(success => {
      if (success.status) {
        localStorage.setItem('mentorAppUser', JSON.stringify(success.data));
        this.router.navigate(['mentoring/confirm-session']);
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
        this.router.navigate(['mentoring/confirm-session']);
      } else {
        this.toast.showMessage(res.message, 'danger');
      }
    }, error => {
    })
  }
  
}
