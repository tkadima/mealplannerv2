import  prisma  from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: {id} } = req; 
	const index = parseInt(id[0]);

	if (req.method === 'PUT') {
		try {
			const body = req.body; 
			const updateFood = await prisma.food.update({
				where: {
					id: index
				},
				data: {
					name: body.name
				}
			});
			return res.status(200).json(updateFood);
		}
		catch (err) {
			console.error(err);
			res.status(500).json({ error: `Error updating recipe: ${err}`, success: false });
		}
	}
	else if (req.method === 'DELETE') {
		try {
			await prisma.food.delete({
				where: {
					id: index
				}
			});
			return res.status(200).json({message: 'Recipe with id was deleted', success: true});
		}
		catch (err) {
			console.error(err);
			res.status(500).json({ error: `Error deleting recipe: ${err}`, success: false });
		}
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
};