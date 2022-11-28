import { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from 'parse-ingredient/dist/types';
import prisma from '../../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: {id} } = req; 
	const index = parseInt(id[0]);

	if (req.method === 'GET') {
		const recipe = await prisma.recipe.findUnique({ 
			where: {id: index},
			include: { ingredients: true }
		});
		return res.status(200).json(recipe);
	}
	else if (req.method === 'PUT') {
		return await updateRecipe(req, res, index);
	}
	else if (req.method === 'DELETE') {
		deleteRecipe(res, index);
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
};
const updateRecipe = async(req: NextApiRequest, res: NextApiResponse, index: number) => {
	const body = req.body;
	const ingredients = body.ingredients ? body.ingredients.map((ingredient: Ingredient) => {
        
		return {        
			recipeId: body.id,
			...ingredient
		};
	} ) as Ingredient[] : [];

	try {
		if (body.ingredients) {

			await prisma.ingredient.deleteMany({
				where: {
					recipeId: index
				}
			});
    
		}
      
		const updateRecipe = await prisma.recipe.update({
			where: {
				id: index
			},
			data: { 
				name: body.name, 
				instructions: body.instructions, 
				prepTime: body.prepTime, 
				cookTime: body.cookTime, 
				yields: body.yields, 
				ingredients: {
					create: ingredients
				}
			}
		});
		return res.status(200).json(updateRecipe);

	} catch (err) {
		console.error('error', err);
		res.status(500).json({ error: `Error updating recipe: ${err}`, success: false });
	}
};

const deleteRecipe = async(res: NextApiResponse, index: number) => {
	try {
		await prisma.ingredient.deleteMany({
			where: {
				recipeId: index
			}
		});
		await prisma.recipe.delete({
			where: {
				id: index
			}
		});
		return res.status(200).json({message: `Recipe with id ${index} was deleted`, success: true});
	}
	catch(err) {
		console.error(err);
		res.status(500).json({ error: `Error deleting recipe: ${err}`, success: false });
	}
};
