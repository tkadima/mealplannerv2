export type Ingredient = { 
 description: string
  id: number
  quantity: number
  unitOfMeasure: string
  recipeId: number
}

export type Recipe = {
	cookTime: number
	id: number
	ingredients: Ingredient[]
	instructions: string
	name: string 
	prepTime: number 
	serves: number
  };
  