import { enumType, extendType, intArg, list, nonNull, objectType } from 'nexus';

export const Meal = objectType({
	name: 'Meal',
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.field('day', {type: DayEnum}),
		t.nonNull.field('mealType', {type: MealTypeEnum}),
		t.list.nonNull.field('recipes', {
			type: 'Recipe', 
			resolve: (parent, _, ctx) => {
				return ctx.prisma.meal.findUnique({
					where: {id: parent.id}
				}).recipes();
			}
		});
	},
});

const DayEnum = enumType({
	name: 'DayEnum', 
	members: [
		'SUNDAY',
		'MONDAY', 
		'TUESDAY', 
		'WEDNESDAY', 
		'THURSDAY', 
		'FRIDAY', 
		'SATURDAY'
	]
});
const MealTypeEnum = enumType({
	name: 'MealTypeEnum', 
	members: [
		'BREAKFAST', 
		'LUNCH', 
		'DINNER', 
		'SNACKS'
	]
});

export const UpdateMealRecipesMutation = extendType({ 
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('updateMealRecipes', {
			type: Meal, 
			args: {
				mealId: nonNull(intArg()),                
				newRecipeIds: nonNull(list(intArg())),
				removeRecipeIds: nonNull(list(intArg()))
			},
			async resolve(_parent, args, ctx){
				const newRecipeIds = args.newRecipeIds.map(recipeId => ({ id: recipeId }));
				const removedRecipeIds = args.removeRecipeIds.map(recipeId => ({ id: recipeId}));
				return  ctx.prisma.meal.update({
					where: { id: args.mealId },
					data: {
						recipes: {
							connect: newRecipeIds,
							disconnect: removedRecipeIds
						}
					}
				});
			}
		});
	}
});

export const ClearMealRecipes = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('clearMealRecipes', {
			type: Meal,
			async resolve(_parent, _, ctx) {
				const meals = await ctx.prisma.meal.findMany({ include: { recipes: true }}); 
				for (const meal of meals){
					const recipes = meal.recipes; 
					const recipeIds = recipes.map(recipe => ({id: recipe.id}));
					if (recipeIds.length > 0) {
						return  await ctx.prisma.meal.update({
							where: {id : meal.id}, 
							data: {
								recipes: {
									disconnect: recipeIds
								}
							}
						});
					}
				
				
				}
			}
		});
	}
});