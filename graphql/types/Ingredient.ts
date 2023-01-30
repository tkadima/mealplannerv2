import { extendType, intArg, list, nonNull, objectType } from 'nexus'; 

export const Ingredient =  objectType({
	name: 'Ingredient',
	definition(t) {
		t.nonNull.int('id'), 
		t.field('quantity', {
			type: 'Float',
			resolve: async(parent, _, ctx) => {
				const ingredient = await ctx.prisma.ingredient.findUnique({
					where: { id: parent.id }
				});

				return ingredient.quantity ? Number.parseFloat(ingredient.quantity.toString()) : null;
			}
		}),
		t.field('quantity2', {
			type: 'Float',
			resolve: async(parent, _, ctx) => {
				const ingredient = await ctx.prisma.ingredient.findUnique({
					where: { id: parent.id }
				});

				return ingredient.quantity2 ? Number.parseFloat(ingredient.quantity2.toString()) : null;
			}
		}),
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
			resolve: async(_parent, args, ctx) => {
				const recipeObjIds = args.recipeIds.map(rid => ({recipeId: rid}));
				const ingredients =  await ctx.prisma.ingredient.findMany({
					where: { 
						OR: recipeObjIds
					}
				});
				return ingredients;
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
				return await ctx.prisma.ingredient.update({
					where: {
						id: ingredientId
					},
					data: {...ingredient, 
						foodId: Number.parseInt(foodId.toString())
					}
				});
			}
		});
	}
});