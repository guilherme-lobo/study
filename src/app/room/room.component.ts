import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from './room.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  public name = '';
  public room: any = {};
  public users: any = [];
  public cards: number[] = [1, 2, 3, 4, 5, 6, 7];
  public myuser: any;
  public visualize: boolean = false

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private socket: Socket
  ) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        this.socket.emit('joinRoom', 
          {
          usuarios:params['username'],
          room:params['roomName']
          }
        )
        this.socket.fromEvent('move').subscribe((data:any) => {
          console.log(data)
          data = JSON.parse(data)
          console.log(data)
          this.room = data[0]
          console.log(this.room)
          this.users = this.room['usuarios']
          this.myuser = this.room['usuarios'].filter((item: any)=>{ 
            console.log(params['username'])
            if(item.name == params['username']) 
              return item
             })[0]
          console.log('Users:',this.users)
          console.log('myUser:',this.myuser)
        });
        this.socket.fromEvent('showUp').subscribe((data:any) => {
          if(data == 'true')
            this.visualize = true
          else
            this.visualize = false
          console.log(this.visualize)
        }); 

      })
  }

  pickCard(number: Number, user:any) {
    user.card = number
    this.socket.emit('playCard',
      {
        card: number,
        usuarios: user,
        room: this.room
      }
    )
  }

  ngOnDestroy(): void {
    this.socket.emit('leaveRoom',
      {
        usuarios:this.myuser,
        room:this.room
      }
    )
  }
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    this.socket.emit('leaveRoom',
      {
        usuarios:this.myuser,
        room:this.room
      }
    )
  }

  showUp(){
    if(this.visualize==true)
      this.visualize = false
    else
      this.visualize = true

    this.socket.emit('showUp', this.visualize)

  }


}




