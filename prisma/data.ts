export const recipes = [
	{
		id: 1,
		name: 'PB and Banana Smoothie', 
		instructions: '1. Blend ingredients in food processor. 2. Serve with toppings', 
		prepTime: 5, 
		cookTime: 5, 
		yields: 1
	}
];

export const ingredients = [
	{
		id: 1, 
		recipeId: 1, 
		quantity: 2, 
		quantity2: null, 
		unitOfMeasureID: null,
		unitOfMeasure: null, 
		description: 'ripe bananas, peeled and frozen', 
		isGroupHeader: false, 
		foodId: 1
	}, 
	{
		id: 2, 
		recipeId: 1, 
		quantity: 2, 
		quantity2: null, 
		unitOfMeasureID: 'tbsp', 
		unitOfMeasure: 'tablespoon',
		description: 'creamy peanut butter', 
		isGroupHeader: false, 
		foodId: 2
	},
	{
		id: 3, 
		recipeId: 1, 
		quantity: 2, 
		quantity2: null, 
		unitOfMeasureID: 'tbsp', 
		unitOfMeasure: 'tablespoon',
		description: 'flaxseed meal (optional)', 
		isGroupHeader: false, 
		foodId: 3
	},
	{
		id: 4, 
		recipeId: 1, 
		quantity: 0.5, 
		quantity2: null, 
		unitOfMeasureID: 'tsp', 
		unitOfMeasure: 'teaspoon',
		description: 'vanilla extract (optional)', 
		isGroupHeader: false, 
		foodId: 4
	},
	{
		id: 5, 
		recipeId: 1, 
		quantity: 0.25, 
		quantity2: null, 
		unitOfMeasureID: 'cup', 
		unitOfMeasure: 'cup',
		description: 'nondairy milk', 
		isGroupHeader: false, 
		foodId: 5
	},
    
    
    

];

export const food = [
	{
		id: 1, 
		name: 'banana', 
		aliases: ['bananas, ripe and frozen']
	},
	{
		id: 2, 
		name: 'banana', 
		aliases: ['creamy peanut butter']
	},
	{
		id: 3, 
		name: 'flaxseed', 
		aliases: ['flaxseed meal (optional)']
	},
	{
		id: 4, 
		name: 'vanilla extract', 
		aliases: ['vanilla extract (optional)']
	},
	{
		id: 5, 
		name: 'nondairy milk',
		aliases: ['almond milk', 'coconut milk']
	}
];