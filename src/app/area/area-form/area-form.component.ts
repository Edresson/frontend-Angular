import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { RegisterAreaServiceService } from './register-area-service.service';
import { AreaService } from '../area.service';
import { Area, Soil } from '../area.model';


@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {

  registerAreaForm: FormGroup;
  areaID: number;
  message;
  editAreaflag: boolean;
  soils: Soil[];

  lt: number = -25.2970272;
  lg: number = -54.112394;
  zoom: number = 15;

  
  constructor(private formBuilder: FormBuilder,private router: Router,private registerService: AreaService,private route: ActivatedRoute,private areaService: AreaService) { }

  ngOnInit() {
    this.editAreaflag = false;
    this.areaService.getSoils().subscribe(
      (data: Soil[]) => {
        this.soils = data;
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
    this.registerAreaForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      geometria:['', Validators.required],
      tiposolo:['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const areaId = +params.get('id');
      console.log('areaid:')
      if(areaId){
        this.getArea(areaId);
        this.areaID = areaId;
        this.editAreaflag = true;

      }
    });
  }
  getArea(areaId: number){
    this.areaService.getArea(areaId).subscribe(
      (area: Area) => {
        //console.log("entrou no edit area",area);
        
        this.editArea(area);
      },
      (err:any) => console.log('error')
    );
    
  }
  editArea(area: Area){
    console.log('area:',area);
    console.log('editarea:',area.description,area.geometry,area.soil.id);
    //não acessa o for
    
    
    //console.log('area',item.description,item.geometry,item.soil.id);
    this.registerAreaForm.patchValue({
        descricao: area.description,
        geometria: area.geometry,
        tiposolo: area.soil.id
    })
    
  }
  get f(){
    return this.registerAreaForm.controls;
  }

  public onSubmit(){
    if(this.registerAreaForm.invalid){
      console.log('retornou');
      return;
    }
    if(!this.editAreaflag){
     
    this.registerService.register(this.f.descricao.value, this.f.geometria.value,this.f.tiposolo.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/area/all']);
      },
      (error) => {
        this.message = error;
      }      
    );
  }
  else{
    this.registerService.edit(this.areaID,this.f.descricao.value, this.f.geometria.value,this.f.tiposolo.value).subscribe(
      (data) => {
        console.log(data);

        //redireciona a view
        this.router.navigate(['/area/all']);
      },
      (error) => {
        this.message = error;
      }      
    );
  }
  }


}