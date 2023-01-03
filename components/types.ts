import { DayOfWeek, MealType } from '@prisma/client';

export type Ingredient = { 
 description: string
  quantity: number
  unitOfMeasure: string
  recipeId: number
}

export type Recipe = {
    id: number
	cookTime: number
	ingredients: Ingredient[]
	instructions: string
	name: string 
	prepTime: number 
	serves: number
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
