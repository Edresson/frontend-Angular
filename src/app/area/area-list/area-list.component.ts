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
  areaEdit : Boolean;
  
  constructor(private areaService: AreaService,private router: Router) { }

  ngOnInit() {
    this.areaEdit  = false;
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

  public onUpdateArea(areaId: number){
    console.log("updateArea")
    this.areaEdit = true;
    this.router.navigate(['/area/edit',areaId]);

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
