import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React from 'react'
import { SimpleRecipe } from '../types'

type PropTypes = {
    recipe: SimpleRecipe, 
    onRecipeChange: Function 
}
const RecipeForm = ({ recipe, onRecipeChange }: PropTypes) => {

  const handleChangeForm = (e) => {
    const newRecipe = { ...recipe, [e.target.name]: e.target.value }
    e.preventDefault()
    onRecipeChange(newRecipe)
  }

  return (
        <Form>
        <Form.Group>
            <Form.Control
                as="input"
                name="name"
                value={recipe.name}
                onChange={handleChangeForm}
                style={{ marginBottom: '30px' }}
                placeholder="Enter recipe title"
            />
            <Form.Control
                as="textarea"
                name="ingredients"
                rows={7}
                placeholder="Enter recipe ingredients e.g. 1 cup vegetable broth"
                value={recipe.ingredients}
                onChange={handleChangeForm}
                style={{ marginBottom: '30px' }}
            />

            <Form.Control
                as="textarea"
                name="instructions"
                rows={7}
                placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
                value={recipe.instructions}
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
                    value={recipe.prepTime}
                    onChange={handleChangeForm}
                />
                <Form.Control
                    style={{ margin: '20px' }}
                    as="input"
                    name="cookTime"
                    placeholder="Add cooking time (minutes)"
                    value={recipe.cookTime}
                    onChange={handleChangeForm}
                />
                 <Form.Control
                    style={{ margin: '20px' }}
                    as="input"
                    name="servingSize"
                    placeholder="Add serving size"
                    value={recipe.servingSize}
                    onChange={handleChangeForm}
                />
            </InputGroup>
        </Form.Group>
    </Form>)
}

export default RecipeForm
