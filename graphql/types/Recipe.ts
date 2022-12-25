import { extendType, objectType } from 'nexus'; 
import prisma from '../../lib/prisma';

// figure out ingredients 
export const Recipe = objectType({
	name: 'Recipe', 
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.string('name'),
		t.string('instructions'),
		t.int('prepTime'),
		t.int('cookTime'),
		t.float('yields');
		t.nonNull.list.nonNull.field('ingredients', {
			type: 'Ingredient', 
			resolve: (parent) => {
				return prisma.recipe.findUnique({
					where: {id: parent.id}
				}).ingredients();
			}
		});
	}
});

export const RecipeQuery = extendType({ 
	type: 'Query', 
	definition(t) {
		t.list.field('recipe', {
			type: 'Recipe',
			resolve: () => {
				return prisma.recipe.findMany();
			}
		});
	}
}); 