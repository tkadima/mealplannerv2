import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState } from 'react'
import { Ingredient, Recipe } from '../types'
import { convertIngredientToString } from '../helpers'
import { parseIngredient } from 'parse-ingredient'

type PropTypes = {
    recipe: Recipe, 
    onRecipeChange: Function 
}
const RecipeForm = ({ recipe, onRecipeChange }: PropTypes) => {

    const createIngredientDict = (ingredientsList: Ingredient[]): Map<string, Ingredient> => {
        const ingredientMap = new Map( 
            ingredientsList.map(ingredient => {
                return [convertIngredientToString(ingredient), ingredient];
            })
        )
        return ingredientMap;
    } 
  const [formRecipe, setFormRecipe] = useState({name: recipe.name, 
    instructions: recipe.instructions, prepTime: recipe.prepTime, 
    cookTime: recipe.cookTime, yields: recipe.yields})

    const [ingredientText, setIngredientText] = useState(recipe.ingredients.map(r => convertIngredientToString(r)).join('\n'))
    const [changes, setChanges] = useState({})

const handleChangeForm = (e: any) => {
    const newRecipe = { ...formRecipe, [e.target.name]: e.target.value }
    setFormRecipe(newRecipe);
    const newChanges = {...changes, [e.target.name]: e.target.value}

    if (e.target.name === 'ingredients') {
        setIngredientText(e.target.value);
    }

    setChanges(convertChanges(newChanges))
    onRecipeChange(changes);
  }

const convertChanges = (recipeChanges: any) => {
    for (let key in recipeChanges) { 
        if (key === 'prepTime' || key === 'cookTime' || key === 'yields') {
            recipeChanges[key] = parseInt(recipeChanges[key])
        }
        else if (key === 'ingredients') {
            recipeChanges[key] = parseIngredient(recipeChanges[key])
        }
    }
    return recipeChanges; 
}

  return (
        <Form>
            <Form.Group>
                <Form.Control
                    as="input"
                    name="name"
                    value={formRecipe.name}
                    onChange={handleChangeForm}
                    style={{ marginBottom: '30px' }}
                    placeholder="Enter recipe title"
                />
                <Form.Control
                    as="textarea"
                    name="ingredients"
                    rows={7}
                    placeholder="Enter recipe ingredients e.g. 1 cup vegetable broth"
                    value={ingredientText}
                    onChange={handleChangeForm}
                    style={{ marginBottom: '30px' }}
                />

                <Form.Control
                    as="textarea"
                    name="instructions"
                    rows={7}
                    placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
                    value={formRecipe.instructions}
                    onChange={handleChangeForm}
                    style={{ marginBottom: '30px' }}
                />

                <InputGroup style={{ padding: '20px' }}>
                    <Form.Control
                        style={{ margin: '20px' }}
                        as="input"
                        name="prepTime"
                        placeholder="Add prep time (minutes)"
                        type="number"
                        value={formRecipe.prepTime || ''}
                        onChange={handleChangeForm}
                    />
                    <Form.Control
                        style={{ margin: '20px' }}
                        as="input"
                        name="cookTime"
                        placeholder="Add cooking time (minutes)"
                        value={formRecipe.cookTime || ''}
                        onChange={handleChangeForm}
                    />
                    <Form.Control
                        style={{ margin: '20px' }}
                        as="input"
                        name="yields"
                        placeholder="Add yield amount"
                        value={formRecipe.yields || ''} 
                        onChange={handleChangeForm}
                    />
                </InputGroup>
            </Form.Group>
    </Form>)
}

export default RecipeForm
