import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState } from 'react'
import { Recipe } from '../types'
import { convertIngredientsToString } from '../helpers'
import { parseIngredient } from 'parse-ingredient'

type PropTypes = {
    recipe: Recipe, 
    onRecipeChange: Function 
    op: string
}
const RecipeForm = ({ recipe, onRecipeChange, op }: PropTypes) => {
  const [formRecipe, setFormRecipe] = useState({...recipe,
    ingredients: recipe.ingredients ? convertIngredientsToString(recipe.ingredients) : ''})

const handleChangeForm = (e: { target: { name: any; value: any } }) => {
    const newRecipe = { ...formRecipe, [e.target.name]: e.target.value }
    setFormRecipe(newRecipe);
    onRecipeChange({...newRecipe, ingredients: parseIngredient(newRecipe.ingredients)});
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
                value={formRecipe.ingredients}
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
                    value={formRecipe.prepTime}
                    onChange={handleChangeForm}
                />
                <Form.Control
                    style={{ margin: '20px' }}
                    as="input"
                    name="cookTime"
                    placeholder="Add cooking time (minutes)"
                    value={formRecipe.cookTime}
                    onChange={handleChangeForm}
                />
                 <Form.Control
                    style={{ margin: '20px' }}
                    as="input"
                    name="yields"
                    placeholder="Add yield amount"
                    value={formRecipe.yields}
                    onChange={handleChangeForm}
                />
            </InputGroup>
        </Form.Group>
    </Form>)
}

export default RecipeForm
