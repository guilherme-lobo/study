import { Component } from '@angular/core';
import { RoomService } from '../room/room.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
    .subscribe((res:any)=>{
      this._router.navigateByUrl('/room/'+res[0].name+'/'+(<HTMLInputElement>document.getElementById("name")).value)

    })
  }

  wantJoin(){
    this.form = true
    if((<HTMLInputElement>document.getElementById("name")).value && (<HTMLInputElement>document.getElementById("invite")).value){
      this.roomService.joinRoom((<HTMLInputElement>document.getElementById("name")).value,(<HTMLInputElement>document.getElementById("invite")).value)
      this._router.navigateByUrl('/room/'+(<HTMLInputElement>document.getElementById("invite")).value+'/'+(<HTMLInputElement>document.getElementById("name")).value)
    } 
    
  }

}
