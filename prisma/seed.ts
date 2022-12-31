import prisma from '../lib/prisma';
import { recipes, ingredients } from './data'; 

const main = async() => {
	await prisma.recipe.createMany({
		data: recipes
	});

	await prisma.ingredient.createMany({
		data: ingredients
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