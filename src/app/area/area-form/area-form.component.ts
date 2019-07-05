import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { RegisterAreaServiceService } from './register-area-service.service';
import { AreaService } from '../area.service';
import { Area, Soil } from '../area.model';
declare const google: any;

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

  polygon: any;
  ownPolygon: any;
  geometria : string;
  drawingManager;
  center: any = {
    lat: -25.29,
    lng: -54.11
  };
  polygonCoords =  [];

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
    var inverso = area.geometry.replace('SRID=4326;MULTIPOLYGON(((','').replace(')))','')
    var points = inverso.split(',')
    var array = []
    points.forEach(function (value, i) {
      //ignora ultima posicao
      if(i != inverso.length){
        var latlng= value.split(' ') 
        console.log('{'+'"lat":'+latlng[0]+','+'"lng":'+latlng[1]+'}')
        array.push( JSON.parse('{'+'"lat":'+latlng[0]+','+'"lng":'+latlng[1]+'}'))
  
      }
    });
  
    this.polygonCoords = array
    console.log("inverso: ")
    console.log(array)

    
    this.ownPolygon = new google.maps.Polygon({
            paths: this.polygonCoords,
            editable: true,
              draggable: true,
              geodesic: true,
              visible: true,
              drawingControl: true,
  
          });
    this.ownPolygon.setMap(this.drawingManager.map);
    

    
    //console.log('area',item.description,item.geometry,item.soil.id);
    this.registerAreaForm.patchValue({
        descricao: area.description,
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


    if(this.polygon== null && this.ownPolygon == null)  return alert("você deve desenhar uma área")
    if(this.polygon!= null){
      //console.log('poligono 1')
      var geometria = 'SRID=4326;MULTIPOLYGON(((';
      var first = '';
      //alert(this.polygon.overlay.getPath().getArray())
      this.polygon.overlay.getPath().forEach(function (value, i) {
              var cord = encodeURI(value).replace(',',' ').replace('%20','').replace('(','').replace(')','');
              if(i == 0){
                first= cord;
              }
              geometria+= cord+','
                
              });
      geometria+=first+')))';
      this.geometria = geometria;
      console.log(this.geometria)
    }else{
      console.log('poligono 2')
      var geometria = 'SRID=4326;MULTIPOLYGON(((';
      var first = '';
      //alert(this.polygon.overlay.getPath().getArray())
      this.ownPolygon.getPath().forEach(function (value, i) {
              var cord = encodeURI(value).replace(',',' ').replace('%20','').replace('(','').replace(')','');
              if(i == 0){
                first= cord;
              }
              geometria+= cord+','
                
              });
      geometria+=first+')))';
      this.geometria = geometria;
      console.log(this.geometria)
    }
  
  
    
    

    if(!this.editAreaflag){
     
    this.registerService.register(this.f.descricao.value, this.geometria,this.f.tiposolo.value).subscribe(
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

    this.registerService.edit(this.areaID,this.f.descricao.value, this.geometria,this.f.tiposolo.value).subscribe(
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

  test(){
    
  
   }
    onMapReady(map) {
      
      this.initDrawingManager(map);
      this.polygon = null;
      this.ownPolygon = null;
      
      
      //this.drawingManager.push(this.polygon)
  
    }
  
    initDrawingManager(map: any) {
      const options = {
        drawingControl: true,
        drawingControlOptions: {
          drawingModes: ["polygon"]
        },
        polygonOptions: {
          draggable: true,
          editable: true
        },
        drawingMode: google.maps.drawing.OverlayType.POLYGON
      };
  
      this.drawingManager = new google.maps.drawing.DrawingManager(options);
      this.drawingManager.setMap(map);
      google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => { // Polygon drawn 
        if (event.type === google.maps.drawing.OverlayType.POLYGON) { 
          console.log('overlay complete')
          //this is the coordinate, you can assign it to a variable or pass into another function. 
          this.polygon = event
          if(this.ownPolygon != null){
            this.ownPolygon.setMap(null); 
            this.ownPolygon = null;
          }
          this.drawingManager.setMap(this.polygon.map);
          //ao mexer o mapa de lugar
          /*google.maps.event.addListener((event), 'bounds_changed',  function(){
            console.log("poligono alterado");
            alert(this.polygon.overlay.getPath().getArray());});*/
            
          //alert(this.polygon.overlay.getPath().getArray()); 
          
          } });
    }
    

}