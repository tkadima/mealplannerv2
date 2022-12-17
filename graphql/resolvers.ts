
export const resolvers = {
	Query: {
		getAllFood: async(_parent, _args, ctx) => await ctx.prisma.food.findMany()
	}
};
