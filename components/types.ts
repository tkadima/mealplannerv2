export type Ingredient = { 
 description: string
  quantity: number
  unitOfMeasure: string
  recipeId: number
}

export type Recipe = {
    id: number
	cookTime: number
	ingredients: Ingredient[]
	instructions: string
	name: string 
	prepTime: number 
	serves: number
  };
  