import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://dev.elevate-apis.shikshalokam.org/osl-bap"

  searchApi(payload:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/dsep/search`,payload)
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

  getMentorDetails(id='63f1ebea23df08285693651a'):Observable<any> {
    return this.http.post('https://dev.elevate-apis.shikshalokam.org/osl-bap/dsep/select',{itemId:id})
  }
  
}
