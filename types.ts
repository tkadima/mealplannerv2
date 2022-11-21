import { Ingredient } from "parse-ingredient";

export class Recipe {  
    id: number;  
    name: string; 
    ingredients?: Ingredient[];
    instructions: string;
    prepTime?: number;
    cookTime?: number;
    yields?: number; 

    constructor(init?:Partial<Recipe>) {
        Object.assign(this, init);
    }
}
  
export type Item = {
    unit: any;
    quantity: any;
    name: string,
    description: string,
  
  }