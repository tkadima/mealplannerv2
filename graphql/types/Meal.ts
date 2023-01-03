import { enumType, extendType, intArg, list, nonNull, objectType } from 'nexus';
import prisma from '../../lib/prisma';

export const Meal = objectType({
	name: 'Meal',
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.field('day', {type: DayEnum}),
		t.nonNull.field('mealType', {type: MealTypeEnum}),
		t.list.nonNull.field('recipes', {
			type: 'Recipe', 
			resolve: (parent) => {
				return prisma.meal.findUnique({
					where: {id: parent.id}
				}).recipes();
			}
		});
	},
});

const DayEnum = enumType({
	name: 'DayEnum', 
	members: {
		SUNDAY: 0, 
		MONDAY: 1, 
		TUESDAY: 2, 
		WEDNESDAY: 3, 
		THURSDAY: 4, 
		FRIDAY: 5, 
		SATURDAY: 6
	}
});
const MealTypeEnum = enumType({
	name: 'MealTypeEnum', 
	members: {
		BREAKFAST: 0, 
		LUNCH: 1, 
		DINNER: 2, 
		SNACKS: 4
	}
});

export const UpdateMealRecipesMutation = extendType({ 
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('updateMealRecipes', {
			type: Meal, 
			args: {
				mealId: nonNull(intArg()),                
				recipeIdList: nonNull(list(intArg()))
			},
			async resolve(_parent, args, _ctx){ // use ctx 
				const recipeIds = args.recipeIdList.map(recipeId => ({id: recipeId}));
				return await prisma.meal.update({
					where: { id: args.mealId },
					data: {
						recipes: {
							connect: recipeIds
						}
					}
				});
			}
		});
	}
});