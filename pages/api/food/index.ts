import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma  from '../../../db';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const food = await prisma.food.findMany();
			console.log('food', food);
			return res.status(200).json(food);
		}
		catch(err) {
			console.error(err);
			res.status(500).json({ error: `Error fetching food: ${err}`, success: false });
		}
		
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}