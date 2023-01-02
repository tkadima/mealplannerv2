import { parseIngredient } from 'parse-ingredient';
import { Ingredient } from './components/types';

export const convertStringToIngredient = (ingredientString: string) => {
	const parsedIngredients = parseIngredient(ingredientString);
	return parsedIngredients.map(i => {
		return { quantity: i.quantity, unitOfMeasure: i.unitOfMeasure, description: i.description};
	});
};

export const convertIngredientToString = (ingredients: Ingredient[]) => {
	if (!ingredients || ingredients.length === 0) return '';
	const ingredientStrings = ingredients.map(ingredient => {
		const quantity = ingredient.quantity ?? '';
		const unit = ingredient.unitOfMeasure  ?? '';
		return `${quantity} ${unit} ${ingredient.description}`;
	});
    
	return ingredientStrings.join('\n');
};

export const getChanges = (original: object, newObj: object) => {
	const originalKeys = Object.keys(original); 
	const diff = {}; 
    
	originalKeys.forEach(key => {
		if (original[key] === null && isNaN(newObj[key])) {
			newObj[key] = null;
		}
		if (original[key] !==  newObj[key] ) { 
			diff[key] = newObj[key]; 
		}
	});
	return diff; 
};