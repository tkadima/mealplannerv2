import { arg, extendType, floatArg, inputObjectType, intArg, list, nonNull, objectType, stringArg } from 'nexus'; 
import prisma from '../../lib/prisma';

export const Recipe = objectType({
	name: 'Recipe', 
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.string('name'),
		t.string('instructions'),
		t.int('prepTime'),
		t.int('cookTime'),
		t.float('serves');
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

export const createIngredientInput = inputObjectType({
	name: 'createIngredientInput',
	definition(t) {
		t.nonNull.string('description'),
		t.string('unitOfMeasure'),
		t.float('quantity');
	},
});

export const RecipeQuery = extendType({ 
	type: 'Query', 
	definition(t) {
		t.list.field('recipe', {
			type: 'Recipe',
			resolve: (_parent, _args, ctx) => {
				return ctx.prisma.recipe.findMany();
			}
		});
	}
}); 

export const CreateRecipeMutation = extendType({ 
	type: 'Mutation', 
	definition(t) { 
		t.nonNull.field('createRecipe', {
			type: Recipe,
			args: {
				name: nonNull(stringArg()), 
				instructions: stringArg(), 
				prepTime: intArg(), 
				cookTime: intArg(),
				serves: floatArg(), 
				ingredients: arg({
					type: list(createIngredientInput)
				})

			},
			async resolve(_parent, args, ctx) {
				return await ctx.prisma.recipe.create({
					data: {...args, 
						ingredients: {
							create: args.ingredients
						}
					}
				});
			}
		});
	}

	// TODO add update mutation 
	// TODO add delete mutation 
});