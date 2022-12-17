import { objectType } from 'nexus'; 
import { Ingredient } from './Ingredient';

export const Recipe = objectType({
	name: 'Recipe', 
	definition(t) {
		t.nonNull.int('id'),
		t.nonNull.string('name'),
		t.string('instructions'),
		t.int('prepTime'),
		t.int('cookTime'),
		t.float('yields'),
		t.nonNull.list.field('ingredients', {
			type: Ingredient
		});
	},
});