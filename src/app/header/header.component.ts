import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { AuthUtilService } from '../login/auth-util.service';1


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authUtil: AuthUtilService) { }

  ngOnInit() {
  }

  public isLogged(){
    return this.authUtil.isLogged();
  }

  public logout(){
    this.authUtil.logout();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
