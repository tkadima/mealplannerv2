import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus';
import prisma from '../../lib/prisma';

export const Food = objectType({
    name: 'Food',
    definition(t){
        t.nonNull.int('id'),
        t.nonNull.string('name'),
        t.nonNull.field('quantity', {
			type: 'Float',
			resolve: async(parent, _, ctx) => {
				const ingredient = await ctx.prisma.ingredient.findUnique({
					where: { id: parent.id }
				});
				return ingredient.quantity ? Number.parseFloat(ingredient.quantity.toString()) : null;
			}
		}),        t.nonNull.string('unitOfMeasure')
        t.nonNull.int('calories')
        t.nonNull.boolean('have')
        t.list.field('ingredients', {
            type: 'Ingredient',
            resolve: async (parent, _, ctx) => {
                const ingredients = await ctx.prisma.food.findUnique({
                    where: { id: parent.id }
                }).ingredients();
                return ingredients;
            }
        })
    }
})

export const createFoodInput = inputObjectType({
    name: 'createFoodInput',
    definition(t) {
        t.nonNull.string('name'),
        t.nonNull.float('quantity')
        t.nonNull.string('unitOfMeasure')
        t.nonNull.int('calories')
        t.nonNull.boolean('have')
    }
});

export const CreateFoodMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createFood', {
            type: Food, 
            args: { 
                ingredientId: nonNull(intArg()),
				newData: nonNull(createFoodInput.asArg()),
            }, 
            async resolve(_parent, { ingredientId, newData }, ctx) {
                const newFood = await ctx.prisma.food.create({
                    data: newData
                })
                
                await ctx.prisma.ingredient.update({
                    where: { id: ingredientId },
                    data: {
                        foodId: newFood.id
                    }
                })

                return newFood;
            }
        })
    }
})