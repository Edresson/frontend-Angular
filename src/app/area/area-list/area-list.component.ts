import { Component, OnInit } from '@angular/core';
import { Area } from '../area.model';
import { AreaService } from '../area.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  areas: Area[];
  constructor(private areaService: AreaService,private router: Router) { }

  ngOnInit() {
    this.areaService.getAreas().subscribe(
      (data: Area[]) => {
        this.areas = data;

        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  public onSubmit(){
    this.router.navigate(['/area/new']);
  }

  public onUpdateArea(area:Area){
    //UpdateArea
  }

  public onDeleteArea(area:Area){
    //Delete area.id
    this.areaService.deleteAreas(area).subscribe(
      (data: string) => {
        this.ngOnInit();
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
    
    //location.reload();

  }
}
