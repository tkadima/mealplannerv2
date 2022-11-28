import { NextApiRequest, NextApiResponse } from 'next'
import { Ingredient } from 'parse-ingredient/dist/types'
import prisma  from '../../../db';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        let recipes = await prisma.recipe.findMany()
        return res.status(200).json(recipes)
    }
    else if (req.method === 'POST') {
        return await createRecipe(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

const createRecipe = async(req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    const ingredients= body.ingredients.map((ingredient: Ingredient) => {
        
        return {        
            recipeId: body.id,
            quantity: ingredient.quantity, 
            quantity2: ingredient.quantity2, 
            unitOfMeasureID: ingredient.unitOfMeasureID,
            unitOfMeasure: ingredient.unitOfMeasure,
            description: ingredient.description, 
            isGroupHeader: ingredient.isGroupHeader
        }
    } ) as Ingredient[];
    
    try { 
        const newRecipe = await prisma.recipe.create({
            include: {ingredients: true},
            data: {
                name: body.name, 
                instructions: body.instructions,
                prepTime: body.prepTime,
                cookTime: body.cookTime, 
                yields: body.yields,
                ingredients: { create: ingredients}
            },
           
        })

    return res.status(200).json(newRecipe)
    } catch(err) {
        console.log('error', err)
        res.status(500).json({ error: `Error creating recipe: ${err}`, success: false })
    }
} 