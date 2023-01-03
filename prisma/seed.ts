import { DayOfWeek, MealType } from '@prisma/client';
import prisma from '../lib/prisma';
import { recipe, ingredients } from './data';

const dayOfWeek = DayOfWeek;
const mealType = MealType; 

const DAYS = [dayOfWeek.SUNDAY, dayOfWeek.MONDAY, dayOfWeek.TUESDAY, dayOfWeek.WEDNESDAY, dayOfWeek.THURSDAY, dayOfWeek.FRIDAY, dayOfWeek.SATURDAY]; 
const MEALS = [mealType.BREAKFAST, mealType.LUNCH, mealType.DINNER, mealType.SNACKS]; 

const main = async() => {
	await prisma.recipe.create({
		data: {
			...recipe,
			ingredients: {
				create: ingredients
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