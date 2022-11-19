import { parseIngredient, Ingredient } from 'parse-ingredient'
import { SimpleRecipe, Item } from './types'

export const createSuggestionList = (recipe: SimpleRecipe, fridgeItems: Item[]) => {
  const ingredientList = parseIngredient(recipe.ingredients)
  const shoppingList = ingredientList.filter(i => !fridgeItems.some(f => f.name === i.description))
  return shoppingList
}

export const convertIngredientsToString = (ingredients: Ingredient[]) => {
  const ingredientLines = ingredients.map(ingredient => {
    const unit = ingredient.unitOfMeasure === null ? '' : ingredient.unitOfMeasure
    return `${ingredient.quantity} ${unit} ${ingredient.description}\n`
  })
  return ingredientLines.join('')
}

