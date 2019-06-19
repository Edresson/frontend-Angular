import { Component, OnInit } from '@angular/core';
import { Resource, Permission } from '../resource.model';
import { ResourceService } from '../resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})

export class ResourceListComponent implements OnInit {

  form:FormGroup;
  resources: Resource[];
  permissions: Permission[];
  resourceEdit : Boolean;
  contratoID;
  myGroup;

  categories = [
    {
      id: 1,
      name: 'Get'
    },
    {
      id: 2,
      name: 'Post'
    },
    {
      id: 3,
      name: 'Put'
    },
    {
      id: 4,
      name: 'Delete'
    }
  ];
    

  grupo = {};

  categoriesSelected = [
    false, false, false,false
  ];
  constructor(private resourceService: ResourceService,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute) { 
    this.myGroup = this.formBuilder.group(this.grupo);
    //this.permissions = [new Permission()]
  }
compare(list1:Boolean[],list2:Boolean[]){


return  JSON.stringify(list1) == JSON.stringify(list2)}

submit() {
  let array = Object.getOwnPropertyNames(this.grupo);
  for (var name of array) {
    console.log(name,":",this.grupo[name][1],'2', this.myGroup.get(name).value, "compare:",this.compare(this.myGroup.get(name).value,this.grupo[name][1]))

    if(!this.compare(this.myGroup.get(name).value,this.grupo[name][1])){ // ocorreu modificação nos checkbox
      let dataPerm = this.myGroup.get(name).value;
      let resourceid= this.grupo[name][2]
      if(this.grupo[name][3]){
        console.log("criar permissao")
        // criar nova permissão, passando os valores  this.myGroup.get(name).value sequencia: get, post, put, delete
        //resourceid: number, contractid: number,get: Boolean,post:Boolean,put:Boolean,del:Boolean
        this.resourceService.createPermission(resourceid,this.contratoID,dataPerm[0],dataPerm[1],dataPerm[2],dataPerm[3]).subscribe(
          (data: Permission) => {
            this.permissions.push(data)
            this.grupo[name][1][0]= this.myGroup.get(name).value[0]
            this.grupo[name][1][1]= this.myGroup.get(name).value[1]
            this.grupo[name][1][2]= this.myGroup.get(name).value[2]
            this.grupo[name][1][3]= this.myGroup.get(name).value[3]
            this.grupo[name][3] = false
            console.log(data);
          },
          (error) =>{
            console.log(error);
          }

        );
     
      }else{
        // atualizar permissão
        console.log("editar permissao")
        let permissionid = this.grupo[name][4]
        this.resourceService.editPermission(permissionid,resourceid,this.contratoID,dataPerm[0],dataPerm[1],dataPerm[2],dataPerm[3]).subscribe(
          (data: string) => {
            this.grupo[name][1][0]= this.myGroup.get(name).value[0]
            this.grupo[name][1][1]= this.myGroup.get(name).value[1]
            this.grupo[name][1][2]= this.myGroup.get(name).value[2]
            this.grupo[name][1][3]= this.myGroup.get(name).value[3]
            console.log(data);
          },
          (error) =>{
            console.log(error);
          }

        );

      } 
    }
      }
}

  ngOnInit() {

    
    this.route.paramMap.subscribe(params => {
      const contratoid = +params.get('id');
      //console.log('contratoid:',contratoid )
      if(contratoid){
        this.contratoID = contratoid;
      }
    });
    
    this.resourceEdit  = false;

    this.resourceService.getPermissions().subscribe(
      (data: Permission[]) => {
        this.permissions= data;

        this.resourceService.getResources().subscribe(
          (data: Resource[]) => {
            let permissionid;
            this.resources = data;
            for (var resource of this.resources) {
              var categoriesS =[];
              for(var permission of this.permissions){
                if(resource.id == permission.resource.id && this.contratoID == permission.contract.id){ //
                  categoriesS = [permission.get,permission.post,permission.put,permission.delete]
                  permissionid = permission.id;
                  //console.log(permission.get,permission.post,permission.put,permission.delete)
                }
              }
              
              if(categoriesS.length > 0){
                this.myGroup.addControl(resource.className,this.formBuilder.array(categoriesS));
                this.grupo[resource.className] = [this.formBuilder.array(categoriesS),categoriesS,resource.id,false,permissionid];
                //console.log(this.grupo[resource.className])
              }else{
                this.myGroup.addControl(resource.className,this.formBuilder.array(this.categoriesSelected));
                this.grupo[resource.className] = [this.formBuilder.array(this.categoriesSelected),this.categoriesSelected,resource.id,true,permissionid] // if true é necessário criar uma nova permissão se false apenas editar
                //console.log(this.grupo[resource.className])
              }
              
              
              
              
             
            }
          },
          (error) =>{
    
    
            console.log(error);
          }
        );
        
        //console.log(this.permissions)
      },
      (error) =>{


        console.log(error);
      }
    );

   
    
    

    
  }



  
}