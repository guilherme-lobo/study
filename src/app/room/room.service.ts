import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url = "http://localhost:3000/room"
  constructor(
   private httpClient:HttpClient
  ) { }

  createRoom(name:String){
    const body ={
        name:name,
        card:0
    }
    return this.httpClient.post(this.url+'/new',body)
  }

  joinRoom(name:any, room:any){
    const body = {
      room:room,
      usuario:{
        name:name,
        card:0
      }
    }
    console.log(body)
    return this.httpClient.post(this.url+'/join',body)
  }
}
