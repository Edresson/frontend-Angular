import { Contrato } from '../contrato/contrato.model';

export class Resource{
    id:string;
    className: string;
    primaryKeyColumnName: string;
    tableName:string;
}


export class Permission{
    id:string;
    resource:Resource;
    contract: Contrato;
    get:Boolean;
    put:Boolean;
    post:Boolean;
    delete:Boolean;
}
