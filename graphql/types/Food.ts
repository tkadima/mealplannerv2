import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus';

export const Food = objectType({
    name: 'Food',
    definition(t){
        t.nonNull.int('id'),
        t.nonNull.string('name'),
        t.nonNull.field('quantity', {
			type: 'Float',
			resolve: async(parent, _, ctx) => {
				const food = await ctx.prisma.food.findUnique({
					where: { id: parent.id }
				});
				return food.quantity ? Number.parseFloat(food.quantity.toString()) : null;
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

export const foodInput = inputObjectType({
    name: 'foodInput',
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
                ingredientId: intArg(),
				newData: nonNull(foodInput.asArg()),
            }, 
            async resolve(_parent, { ingredientId, newData }, ctx) {
                const newFood = await ctx.prisma.food.create({
                    data: newData
                })
                
                if (ingredientId) {
                    await ctx.prisma.ingredient.update({
                        where: { id: ingredientId },
                        data: {
                            foodId: newFood.id
                        }
                    })
                }

                return newFood;
            }
        })
    }
});

export const UpdateFoodMutation = extendType({
    type: 'Mutation', 
    definition(t) {
        t.nonNull.field('updateFood', {
            type: Food, 
            args: {
                foodId: nonNull(intArg()),
                newData: nonNull(foodInput.asArg()),
            }, 
            async resolve(_parent, { foodId, newData }, ctx) {
                console.log('newData', newData)
                return await ctx.prisma.food.update({
                    where: { id: foodId },
                    data: {
                        ...newData
                    }
                })
            }
        })
    },
});


export const DeleteFoodMutation = extendType({ 
	type: 'Mutation', 
	definition(t) { 
		t.nonNull.field('deleteFood', {
			type: Food,
			args: {
				deleteFoodId: nonNull(intArg())
			},
			async resolve(_parent, {deleteFoodId}, ctx) {
				return await ctx.prisma.food.delete({
					where: {
						id: deleteFoodId
					}
				});
			}
		});
	}
});

