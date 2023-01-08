import { objectType } from 'nexus'; 

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
	}
});