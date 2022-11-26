import { Ingredient } from "parse-ingredient/dist/types";

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

// export type Ingredient = {
//     id: number, 
//     recipeId: number, 
//     quantity: number, 
//     quantity2: number,
//     unitOfMeasureID: string, 
//     unitOfMeasure: string, 
//     description: string, 
//     isGroupHeader: string
// }
  
export type Item = {
    unit: any;
    quantity: any;
    name: string,
    description: string,
  
  }