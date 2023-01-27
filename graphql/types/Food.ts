import { arg, extendType, floatArg, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import prisma from '../../lib/prisma';
import { ingredientInput } from './Recipe';


export const Food = objectType({
    name: 'Food',
    definition(t){
        t.nonNull.int('id'),
        t.nonNull.string('name'),
        t.nonNull.float('quantity')
        t.nonNull.string('unitOfMeasure')
        t.int('calories')
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
export const CreateFoodMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createFood', {
            type: Food, 
            args: { 
                name: nonNull(stringArg()),
                quantity: nonNull(floatArg()),
                unitOfMeasure: nonNull(stringArg()),
                calories: nullable(intArg()),
            }, 
            async resolve(_parent, args) {
                console.log('args');
                return await prisma.food.create({
					data: {...args, 
                        quantity: Number.parseFloat(args.quantity.toString())
					}
				});
            }
        })
    }
})