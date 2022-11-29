import { Ingredient } from './types';

export const convertIngredientToString = (ingredient: Ingredient) => {
	const unit = ingredient.unitOfMeasure === null ? '' : ingredient.unitOfMeasure;
	return `${ingredient.quantity} ${unit} ${ingredient.description}`;
};
