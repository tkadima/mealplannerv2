import prisma from './index';
import { recipes } from './data'; 

const main = async() => {
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