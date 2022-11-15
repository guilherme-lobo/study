import { Component, OnInit } from '@angular/core';
import { RoomsServiceService } from '../rooms-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  all:any
  constructor(private roomService:RoomsServiceService) { }
  

 async listAllRooms(){
     this.all= await this.roomService.listAllRooms()
      
    }

  ngOnInit(): void {
  }

}
