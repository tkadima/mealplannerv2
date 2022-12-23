import prisma from '../lib/prisma';
import { recipes, ingredients, food } from './data'; 

const main = async() => {
	await prisma.food.createMany({
		data: food
	});

	await prisma.ingredient.createMany({
		data: ingredients
	});

	await prisma.recipe.createMany({
		data: recipes
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