import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma  from '../../../lib/prisma';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
	// if (req.method === 'GET') {
	// 	try {
	// 		const food = await prisma.food.findMany();
	// 		return res.status(200).json(food);
	// 	}
	// 	catch(err) {
	// 		console.error(err);
	// 		res.status(500).json({ error: `Error fetching food: ${err}`, success: false });
	// 	}
	// }
	if (req.method === 'POST') {
		try { 
			const body = req.body; 
			const newFood = await prisma.food.create({
				data: {
					name: body.name,
					aliases: []
				}
			});

			res.status(200).json(newFood);
		}
		catch (err) {
			console.error(err);
			res.status(500).json({ error: `Error creating recipe: ${err}`, success: false });
		}
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}