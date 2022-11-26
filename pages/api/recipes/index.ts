import { PrismaClient } from '@prisma/client'
import { Ingredient } from 'parse-ingredient/dist/types'

// POST: creating a new recipe
// GET: fetch all recipes 
// all other methods return 405 - method not allowed 
const prisma = new PrismaClient()

export default async function handler (req, res) {
    if (req.method === 'GET') {
        let recipes = await prisma.recipes.findMany()
        return res.status(200).json(recipes)
    }
    else if (req.method === 'POST') {
        return await createRecipe(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

const createRecipe = async(req, res) => {
    
    const body = req.body;
    const ingredients = body.ingredients.map((ingredient: Ingredient) => {
        return {        
            quantity: ingredient.quantity, 
            quantity_2: ingredient.quantity2, 
            unit_of_measure_id: ingredient.unitOfMeasureID,
            unit_of_measure: ingredient.unitOfMeasure,
            description: ingredient.description, 
            isgroupheader: ingredient.isGroupHeader
        }
    } )
    
    try { 
        const newRecipe = await prisma.recipes.create({
            data: {
                id: body.id, 
                name: body.name, 
                instructions: body.instructions,
                prep_time: body.prepTime,
                cook_time: body.cookTime, 
                yields: body.yields,
                ingredients: {
                    createMany: {data: ingredients} 
                }
            },
            include:{
                ingredients: true
            }
        })

        return res.status(200).json(newRecipe, { success: true })
    } catch(err) {
        console.log('error', err)
        res.status(500).json({ error: `Error creating recipe: ${err}`, success: false })
    }
} 