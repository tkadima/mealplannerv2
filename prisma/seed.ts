import { DayOfWeek, MealType } from '@prisma/client';
import prisma from '../lib/prisma';
import { recipes, ingredients } from './data';

const DAYS = [DayOfWeek.SUNDAY, DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY]; 
const MEALS = [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER, MealType.SNACKS]; 

const main = async() => {
	await prisma.recipe.create({
		data: {
			...recipes[0],
			ingredients: {
				create: ingredients.slice(0, 5)
			}
		}
	});

	await prisma.recipe.create({
		data: {
			...recipes[1],
			ingredients: {
				create: ingredients.slice(5)
			}
		}
	});
	

	DAYS.forEach(async (day) => {
		MEALS.forEach(async (mealType) => {
			await prisma.meal.create({ 
				data: {
					day: day as prisma.DayOfWeek, 
					mealType: mealType as prisma.MealType, 
				}
			});
		});
	
	});
	
};

main()
	.catch(e => {
		console.log(e);
		process.exit(1);

	})
	.finally(async () => {
		await prisma.$disconnect();
	});