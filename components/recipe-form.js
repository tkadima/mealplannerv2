import Form from 'react-bootstrap/Form';
import { useState } from "react";

const RecipeForm = ({onCreateRecipe, recipe, op, onEditRecipe}) => {

    const [recipeChanges, setRecipeChanges] = useState({id: recipe.id })

    const handleChangeForm = (e) => {
        let newRecipe = {...recipe, [e.target.name]: e.target.value}
        e.preventDefault();
        if (op === 'add')
            onCreateRecipe(newRecipe)
        else if (op === 'edit') {
            onEditRecipe(newRecipe)
        }
    }

    return (
        <Form>
        <Form.Group>
            <Form.Control 
                as="input" 
                name="name" 
                value={recipe.name} 
                onChange={handleChangeForm} 
                style={{marginBottom: '30px'}}
                placeholder="Enter recipe title"
            />
            <Form.Control 
                as="textarea" 
                name="ingredients" 
                rows={7} 
                placeholder="Enter recipe ingredients e.g. 1 cup vegetable broth"
                value={recipe.ingredients} 
                onChange={handleChangeForm}
                style={{marginBottom: '30px'}}
            />

            <Form.Control
                as="textarea"
                name="instructions"
                rows={7}
                placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
                value={recipe.instructions}
                onChange={handleChangeForm}
                style={{marginBottom: '30px'}}
            />
            
            <div>
                <Form.Control
                    style={{ width: '40%', float: "left"}}
                    as="input"
                    name="prepTime"
                    placeholder="Enter prep time in minutes"
                    type="number"
                    value={recipe.prepTime}
                    onChange={handleChangeForm}
                />
                <Form.Control
                    style={{ width: '40%', float: "right",}}
                    as="input" 
                    name="cookTime" 
                    placeholder="Enter cooking time in minutes"
                    value={recipe.cookTime}
                    onChange={handleChangeForm}
                />
            </div>
        </Form.Group>
    </Form>);
}

export default RecipeForm;