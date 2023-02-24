import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getMentors(payload:any):Observable<any> {
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/dsep/search',payload)
  }

  login(payload):Observable<any>{
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/login',payload)
  }

  signup(payload):Observable<any>{
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/signup',payload)
  }

  addProfile(payload):Observable<any>{
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/user/profile/add',payload)
  }

}
