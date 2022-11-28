import { Item, Recipe, Ingredient } from './types';

export const createSuggestionList = (recipe: Recipe, fridgeItems: Item[]) => {
	const shoppingList = recipe.ingredients.filter(i => !fridgeItems.some(f => f.name === i.description));
	return shoppingList;
};

export const convertIngredientToString = (ingredient: Ingredient) => {
	const unit = ingredient.unitOfMeasure === null ? '' : ingredient.unitOfMeasure;
	return `${ingredient.quantity} ${unit} ${ingredient.description}`;
};
