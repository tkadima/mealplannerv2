import prisma from '../lib/prisma';
import { recipe, ingredients } from './data'; 

const main = async() => {
	await prisma.recipe.create({
		data: {
			...recipe,
			ingredients: {
				create: ingredients
			}
		}
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