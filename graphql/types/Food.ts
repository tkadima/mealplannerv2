import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus';
import prisma from '../../lib/prisma';


export const Food = objectType({
    name: 'Food',
    definition(t){
        t.nonNull.int('id'),
        t.nonNull.string('name'),
        t.nonNull.float('quantity')
        t.nonNull.string('unitOfMeasure')
        t.int('calories')
        t.nonNull.boolean('have')
        t.list.field('ingredients', {
            type: 'Ingredient',
            resolve: async (parent, _, ctx) => {
                const ingredients = await ctx.prisma.food.findUnique({
                    where: { id: parent.id }
                }).ingredients();
                return ingredients.map(i => {
					const quantity = i.quantity ? Number.parseFloat(i.quantity.toString()): null;
					const quantity2 = i.quantity2 ? Number.parseFloat(i.quantity2.toString()): null;

					return ({...i, quantity, quantity2});
				});
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
        t.int('calories')
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
            async resolve(_parent, args) {
                const newFood = await prisma.food.create({
					data: {...args.newData, 
                        quantity: Number.parseFloat(args.newData.quantity.toString()), 
					}, 
                    
				});

                await prisma.ingredient.update({
                    where: { id: args.ingredientId },
                    data: {
                        foodId: newFood.id
                    }
                })

                return newFood;
            }
        })
    }
})