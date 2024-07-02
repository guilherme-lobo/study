import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public name = '';
  public room: any = {};
  public users:any = [];
  public cards: number[] = [1,2,3,4,5,6,7];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( (params) => {
        this.roomService.joinRoom(params['username'], params['roomName'])
        .subscribe((res)=>{
        this.room = res
        this.users = this.room['usuarios']
        console.log(this.users)
        })
        
      })
  }
}


