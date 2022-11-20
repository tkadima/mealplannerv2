import { Ingredient } from 'parse-ingredient'
import { Item, Recipe } from './types'

export const createSuggestionList = (recipe: Recipe, fridgeItems: Item[]) => {
  const shoppingList = recipe.ingredients.filter(i => !fridgeItems.some(f => f.name === i.description))
  return shoppingList
}

export const convertIngredientsToString = (ingredients: Ingredient[]) => {
  const ingredientLines = ingredients.map(ingredient => {
    const unit = ingredient.unitOfMeasure === null ? '' : ingredient.unitOfMeasure
    return `${ingredient.quantity} ${unit} ${ingredient.description}\n`
  })
  return ingredientLines.join('')
}

