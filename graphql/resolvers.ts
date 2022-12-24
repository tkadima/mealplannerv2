
export const resolvers = {
	Query: {
		food: async(_parent, _args, ctx) => {
			return ctx.prisma.food.findMany();
		}
	}
};
