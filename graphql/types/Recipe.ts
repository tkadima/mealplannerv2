import { extendType, inputObjectType, list, nonNull, objectType } from 'nexus'; 
import prisma from '../../lib/prisma';
import { ingredients } from '../../prisma/data';

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

const createFoodInput= inputObjectType({ 
	name: 'createFoodInputType', 
	definition(t) {
		t.string('name');
	},
});

const createIngredientInput = inputObjectType({ 
	name: 'createIngredientInputType',
	definition(t) {
		t.float('quantity'),
		t.float('quantity2'),
		t.string('unitOfMeasureID'),
		t.string('unitOfMeasure'),
		t.nonNull.string('description'),
		t.nonNull.boolean('isGroupHeader'),
		t.field('food', { type: nonNull(createFoodInput)});
	}
});

const createRecipeInput = inputObjectType({ 
	name: 'createRecipeInput', 
	definition(t) {
		t.nonNull.string('name'),
		t.string('instructions'), 
		t.int('prepTime'), 
		t.int('cookTime'), 
		t.float('yields'), 
		t.field('ingredients', { type: list(nonNull(createIngredientInput))});
	}
});

export const CreateRecipeMutation = extendType({ 
	type: 'Mutation',
	definition(t) { 
		t.nonNull.field('createRecipe', {
			type: Recipe,
			args: {
				createRecipeInput: nonNull(createRecipeInput.asArg()),
			},
			resolve: async (_parent, args) => {
				return  await prisma.recipe.create({
					data: {
						name: args.createRecipeInput.name, 
						instructions: args.createRecipeInput.instructions,
						prepTime: args.createRecipeInput.prepTime, 
						cookTime: args.createRecipeInput.cookTime, 
						yields: args.createRecipeInput.yields,
						ingredients: {
							create: args.createRecipeInput.ingredients.map((i) => {
								i.quantity;
								i.quantity2, 
								i.unitOfMeasureID, 
								i.unitOfMeasure,
								i.description, 
								i.isGroupHeader,
								{
									create: {
										data: { name: i.food.name }
									}
								};
							}),
						}
					},
					include: {
						ingredients: {
							include: {
								food: true
							}
						}
					}
				});
			}
		});
	}
});