import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db'

// PUT : edit recipe at id 
// DELETE: delete recipe at id 
// GET: simple fetch 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    const { query: {id} } = req; 
    const index = parseInt(id[0])

    if (req.method === 'GET') {
        const recipe = prisma.recipe.findUnique({ 
            where: {id: index}
        })
        return res.status(200).json(recipe)
    }
    else if (req.method === 'PUT') {
        return await updateRecipe(req, res, index)
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}
const updateRecipe = async(req: NextApiRequest, res: NextApiResponse, recipeId: number) => {
    try {
        const updateRecipe = await prisma.recipe.update({
            where: {
                id: recipeId
            },
            data: req.body
        })
        return res.status(200).json(updateRecipe)

    } catch (err) {
        console.log('error', err)
        res.status(500).json({ error: `Error updating recipe: ${err}`, success: false })
    }
    
}