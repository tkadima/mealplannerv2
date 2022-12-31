import { objectType } from 'nexus'; 
import prisma from '../../lib/prisma';

export const Ingredient =  objectType({
	name: 'Ingredient',
	definition(t) {
		t.nonNull.int('id'), 
		t.float('quantity'),
		t.string('unitOfMeasure'),
		t.nonNull.string('description'),
		t.nonNull.field('recipe', { 
			type: 'Recipe',
			resolve: (parent) => {
				return prisma.ingredient.findUnique({
					where: { id: parent.id}
				}).recipe();
			}
		});
	}
});