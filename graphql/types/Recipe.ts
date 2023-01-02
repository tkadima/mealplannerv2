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

export const ingredientInput = inputObjectType({
	name: 'ingredientInput',
	definition(t) {
		t.nonNull.string('description'),
		t.int('id'),
		t.string('unitOfMeasure'),
		t.float('quantity');
		t.int('recipeId');
	},
});

export const recipeInput = inputObjectType({
	name: 'recipeInput', 
	definition(t) {
		t.int('id'),
		t.string('name'),
		t.string('instructions'),
		t.int('prepTime'),
		t.int('cookTime'),
		t.float('serves');
		t.field('ingredients', { type: list(nonNull(ingredientInput))});
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
					type: list(ingredientInput)
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
});

export const UpdateRecipeMutation = extendType({
	type: 'Mutation', 
	definition(t) {
		t.nonNull.field('updateRecipe', {
			type: Recipe,
			args: {
				recipeId: nonNull(intArg()),
				newData: nonNull(recipeInput.asArg()),
			},
			async resolve(_parent, args, ctx) { 
				if (args.newData.ingredients) {
					await prisma.ingredient.deleteMany({
						where: {
							recipeId: args.recipeId
						}
					});
				}
				return await ctx.prisma.recipe.update({
					where: {
						id: args.recipeId
					},
					data: {
						...args.newData, 
						ingredients: {
							create: args.newData.ingredients
						}
					}
				});
			}
		});
	},

});

export const DeleteRecipeMutation = extendType({ 
	type: 'Mutation', 
	definition(t) { 
		t.nonNull.field('deleteRecipe', {
			type: Recipe,
			args: {
				deleteRecipeId: nonNull(intArg())
			},
			async resolve(_parent, args, ctx) {
				await ctx.prisma.ingredient.deleteMany({
					where: {
						recipeId: args.deleteRecipeId
					}
				});
				return await prisma.recipe.delete({
					where: {
						id: args.deleteRecipeId
					}
				});
			}
		});
	}
});