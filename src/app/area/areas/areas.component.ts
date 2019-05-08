import { Component, OnInit } from '@angular/core';
import { Area } from '../area.model';
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  area: Area;
  constructor() { }

  ngOnInit() {
  }

}
