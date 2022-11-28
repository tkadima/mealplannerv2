import { ingredient } from '@prisma/client';


export class Recipe {  
	id?: number;  
	name: string; 
	ingredients?: ingredient[];
	instructions: string;
	prepTime?: number;
	cookTime?: number;
	yields?: number; 

	constructor(init?:Partial<Recipe>) {
		Object.assign(this, init);
	}
}

export type Ingredient = ingredient; 
  
export type Item = {
    unit: any;
    quantity: any;
    name: string,
    description: string,
  
  }