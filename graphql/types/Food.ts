import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'; 

export const Food = objectType({
	name: 'Food',
	definition(t) {
		t.nonNull.int('id'), 
		t.nonNull.string('name'),
		t.list.string('aliases');
	}
});

export const FoodQuery = extendType({ 
	type: 'Query', 
	definition(t) {
		t.list.field('food', {
			type: 'Food',
			resolve: (_parent, args, ctx) => {
				return ctx.prisma.food.findMany();
			}
		});
	}
});

export const CreateFoodMutation = extendType({ 
	type: 'Mutation', 
	definition(t) { 
		t.nonNull.field('createFood', {
			type: Food,
			args: {
				name: nonNull(stringArg())
			},
			async resolve(_parent, args, ctx) {
				const food = { name: args.name}; 
				return await ctx.prisma.food.create({
					data: food
				});
			}
		});
	}
});

export const DeleteFoodMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('deleteFood', {
			type: Food,
			args: {
				foodId: nonNull(intArg())
			}, 
			async resolve(_parent, args, ctx) {
				return await ctx.prisma.food.delete({
					where: { id: args.foodId}
				}); 
			}
		});
	}
});