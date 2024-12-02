import { Component } from '@angular/core';
import { RoomService } from './room/room.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomComponent } from './room/room.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public form = false;
  public invite='';
  public name='';

  constructor(
    private roomService: RoomService,
    private _router: Router
  ){}

  createRoom(){
    this.name = (<HTMLInputElement>document.getElementById("name")).value
    this.roomService.createRoom(this.name)
    .subscribe((res)=>{
      this._router
    })
  }

  wantJoin(){
    this.form = true
    if((<HTMLInputElement>document.getElementById("name")).value && (<HTMLInputElement>document.getElementById("invite")).value){
      this._router.navigate([RoomComponent])
    }  
  }
  
}
