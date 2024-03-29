import { parseIngredient } from 'parse-ingredient';
import { Ingredient, Recipe } from './components/types';

export const convertStringToIngredient = (ingredientString: string) => {
	const parsedIngredients = parseIngredient(ingredientString);
	return parsedIngredients.map(i => {
		return { 
			quantity: i.quantity, 
			quantity2: i.quantity2,
			unitOfMeasure: i.unitOfMeasure,
			description: i.description,
			isGroupHeader: i.isGroupHeader
		};
	});
};

export const convertIngredientToString = (ingredients: Ingredient[]) => {
	if (!ingredients || ingredients.length === 0) return '';
	const ingredientStrings = ingredients.map(ingredient => {
		if (ingredient.isGroupHeader) return ingredient.description; 
		const ingredientString = [];
		if (ingredient.quantity) ingredientString.push(ingredient.quantity); 
		if (ingredient.quantity && ingredient.quantity2) ingredientString.push('-' + ingredient.quantity2 );
		if (ingredient.unitOfMeasure) ingredientString.push(' ' + ingredient.unitOfMeasure );
		if (ingredient.description) ingredientString.push(' ' + ingredient.description); 

		return ingredientString.join('');
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

const getReportForMeal = (recipes: Recipe[]) => {
	const ingredients = recipes.flatMap(r => r.ingredients); 
	let sum = 0;
	for (const ingredient of ingredients) {
		if (ingredient.food) {
			sum += ingredient.food.calories; 
		}
		else {
			return -1;
		}
	}
	return sum;
}
/*
loop through meals 
{"Breakfast": [recipes], "Lunch": []...}
 */
export const getDailyReport = (dayMeals: {Breakfast: Recipe[], Lunch: Recipe[], Dinner: Recipe[]}) => {
	const mealTypes = Object.keys(dayMeals); 
	const mealResults = mealTypes.map(mealType => getReportForMeal(dayMeals[mealType]))
} 



