import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.httpClient.get(this.url+ '/'+name+'/join/'+room)
  }
}
