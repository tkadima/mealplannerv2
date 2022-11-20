import { Ingredient } from "parse-ingredient";


export class Recipe {  
    id: number;  
    name: string; 
    ingredients: Ingredient[];

    constructor(init?:Partial<Recipe>) {
        Object.assign(this, init);
    }
}


export type SimpleRecipe = {
    id: number,
    name: string,
    ingredients: string, 
    instructions: string
    prepTime: string, 
    cookTime: string,
    servingSize: string,
}
  
export type Item = {
    unit: any;
    quantity: any;
    name: string,
    description: string,
  
  }