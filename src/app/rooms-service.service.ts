import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IRoom } from './interface/i-room';

@Injectable({
  providedIn: 'root'
})
export class RoomsServiceService {

  constructor(private httpClient:HttpClient) { }

  listAllRooms(){
    return this.httpClient.get<IRoom>("http://localhost:3000/all").toPromise()
  }
}
  