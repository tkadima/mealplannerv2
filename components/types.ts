import { DayOfWeek, MealType } from '@prisma/client';


export type Food = {
	id: number, 
	name: string, 
	quantity: number, 
	unitOfMeasure: string,
	calories: number,
	ingredients: Ingredient[]
}
export type Ingredient = { 
	id: number,
	description: string
	quantity: number
	quantity2: number
	unitOfMeasure: string
	recipeId: number
	isGroupHeader: boolean
	have: boolean
}

export type Recipe = {
    id: number
	cookTime: number
	ingredients: Ingredient[]
	instructions: string
	name: string
	prepTime: number 
	serves: number,
	requiresOven: boolean,
	requiresStovetop: boolean
  };

export type Meal = {
	id: number, 
	day: DayOfWeek,
	mealType: MealType,
	recipes: Recipe[]
}

export const DaysOfWeek = {
	'Sunday': DayOfWeek.SUNDAY,
	'Monday': DayOfWeek.MONDAY,
	'Tuesday': DayOfWeek.TUESDAY,
	'Wednesday': DayOfWeek.WEDNESDAY,
	'Thursday': DayOfWeek.THURSDAY,
	'Friday': DayOfWeek.FRIDAY,
	'Saturday': DayOfWeek.SATURDAY
}; 

export const MealTypes = {
	'Breakfast': MealType.BREAKFAST, 
	'Lunch': MealType.LUNCH, 
	'Dinner': MealType.DINNER, 
	'Snacks': MealType.SNACKS
}; 
