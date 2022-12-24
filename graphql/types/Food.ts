import { extendType, objectType } from 'nexus'; 

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