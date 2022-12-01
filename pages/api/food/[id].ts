import  prisma  from '../../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: {id} } = req; 
	const index = parseInt(id[0]);

	if (req.method === 'PUT') {
		try {
			const body = req.body; 
			console.log('body', body);
			const updateFood = await prisma.food.update({
				where: {
					id: index
				},
				data: {
					name: body.name
				}
			});
			console.log('returns', updateFood);
			return res.status(200).json(updateFood);
		}
		catch (err) {
			console.error(err);
			res.status(500).json({ error: `Error updating recipe: ${err}`, success: false });
		}
	}
	else if (req.method === 'DELETE') {
		return res.status(200).json({message: 'Recipe with id was deleted', success: true});
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
};