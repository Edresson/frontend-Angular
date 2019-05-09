export class Area{
    id:string;
    description:string;
    geometry: string;
    soil: Soil;
}

export class Soil{
    id:string;
    description:string;
    descriptionPT:string;
    descriptionES:string;
}


// area-list ao invez de areas
//area-form  ao invez de new-area e edit-area