import { objectType } from 'nexus';

export const Food = objectType({ 
	name: 'Food', 
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.float('amount');
		t.string('unit');
		t.list.nonNull.field('ingredients', {
			type: 'Ingredient', 
			resolve: async(parent, _, ctx) => {
				const ingredients =  await ctx.prisma.food.findUnique({
					where: {id: parent.id}
				}).ingredients();

				return ingredients.map(i => {
					const quantity = i.quantity ? Number.parseFloat(i.quantity.toString()): null;
					const quantity2 = i.quantity2 ? Number.parseFloat(i.quantity2.toString()): null;

					return ({...i, quantity, quantity2});
				});
			}
		});
		t.nonNull.boolean('have');
	},
});

// food create/connect or upsert 
