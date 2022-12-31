export const recipes = [
	{
		id: 1,
		name: 'PB and Banana Smoothie', 
		instructions: '1. Blend ingredients in food processor. 2. Serve with toppings', 
		prepTime: 5, 
		cookTime: 5, 
		serves: 1
	}
];

export const ingredients = [
	{
		id: 1, 
		recipeId: 1, 
		quantity: 2, 
		unitOfMeasure: null, 
		description: 'ripe bananas, peeled and frozen', 
	}, 
	{
		id: 2, 
		recipeId: 1, 
		quantity: 2, 
		unitOfMeasure: 'tablespoon',
		description: 'creamy peanut butter', 
	},
	{
		id: 3, 
		recipeId: 1, 
		quantity: 2, 
		unitOfMeasure: 'tablespoon',
		description: 'flaxseed meal (optional)', 
	},
	{
		id: 4, 
		recipeId: 1, 
		quantity: 0.5, 
		unitOfMeasure: 'teaspoon',
		description: 'vanilla extract (optional)', 
	},
	{
		id: 5, 
		recipeId: 1, 
		quantity: 0.25, 
		unitOfMeasure: 'cup',
		description: 'nondairy milk', 
	},

];
