import { extendType, intArg, list, nonNull, objectType } from 'nexus'; 
import prisma from '../../lib/prisma';

export const Ingredient =  objectType({
	name: 'Ingredient',
	definition(t) {
		t.nonNull.int('id'), 
		t.float('quantity'),
		t.float('quantity2'),
		t.string('unitOfMeasure'),
		t.nonNull.string('description'),
		t.nonNull.int('recipeId'),
		t.nonNull.field('recipe', { 
			type: 'Recipe',
			resolve: (parent, _, ctx) => {
				return  ctx.prisma.ingredient.findUnique({
					where: { id: parent.id}
				}).recipe();
			}
		}),
		t.nonNull.boolean('isGroupHeader');
		t.int('foodId')
	}
});

export const IngredientQuery = extendType({
	type: 'Query', 
	definition(t) {
		t.list.field('ingredient', {
			type: Ingredient,
			args: { recipeIds: nonNull(list(intArg()))},
			// move into resolver 
			resolve: async(_parent, args, ctx) => {
				const recipeObjIds = args.recipeIds.map(rid => ({recipeId: rid}));
				const ingredients =  await ctx.prisma.ingredient.findMany({
					where: { 
						OR: recipeObjIds
					}
				});
				return ingredients.map(i => {
					// do this just once 
					const quantity = i.quantity ? Number.parseFloat(i.quantity.toString()): null;
					const quantity2 = i.quantity2 ? Number.parseFloat(i.quantity2.toString()): null;
					return ({...i, quantity, quantity2});
				});
			}
		});
	},
});

export const UpdateIngredientFoodIdMutation = extendType({ 
	type: 'Mutation', 
	definition(t) { 
		t.nonNull.field('updateIngredientFoodIdMutation', {
			type: 'Ingredient', 
			args: {
				ingredientId: nonNull(intArg()),
				foodId: nonNull(intArg())
			},
			async resolve(_parent, {ingredientId, foodId}, ctx) {
				const ingredient = await ctx.prisma.ingredient.findUnique({ where: { id: ingredientId }})
				
				return await prisma.ingredient.update({
					where: {
						id: ingredientId
					},
					data: {...ingredient, 
						quantity:  ingredient.quantity ? Number.parseFloat(ingredient.quantity.toString()): null,
						quantity2: ingredient.quantity2 ? Number.parseFloat(ingredient.quantity2.toString()): null,
						foodId: Number.parseInt(foodId.toString())
					}
				});
			}
		});
	}
});