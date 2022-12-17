import { objectType } from 'nexus'; 

import { Food } from './Food';
import { Recipe } from './Recipe';

export const Ingredient =  objectType({
	name: 'Ingredient',
	definition(t) {
		t.nonNull.int('id'), 
		t.nonNull.int('recipeId'),
		t.nonNull.int('foodId'),
		t.float('quantity'),
		t.float('quantity2'),
		t.string('unitOfMeasureID'),
		t.string('unitOfMeasure'),
		t.nonNull.string('description'),
		t.nonNull.boolean('isGroupHeader'),
		t.field('recipe', { 
			type: Recipe
		}
		),
		t.field('food', { 
			type: Food
		});
	}
}
);