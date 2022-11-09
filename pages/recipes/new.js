import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import createShoppingList from "../../helpers/shopping-list";
import Layout from "../../components/layout";
import data from '../../data.json'
import ListSuggestion from '../../components/list-suggestion';


const NewRecipe = () => {
    const [recipe, setRecipe] = useState(null)
    const [suggestions, setSuggestions] = useState([]); 

    const handleChangeRecipe = (event) => {
        setRecipe(event.target.value);
    }

    const handleSubmitRecipe = () => {
        let list = createShoppingList(recipe, data.fridge);
        setSuggestions(list);
    }

    const handleListSuggestionAction = (response) => {
        if (response === "yes") {}// add to shopping list in data store 
        if (response === "no") {} // do nothing 
        if (response === "already-have") {}// add to fridge
    }

    return (
        <Layout>
            <h3>Create New Recipe</h3>
            <div className='col-8'>
                <Form>
                    <Form.Group>
                        <Form.Label>Copy and paste a recipe</Form.Label>
                        <Form.Control as="textarea" rows={7} onChange={handleChangeRecipe}/>
                        <div className="col text-center padding-md">
                            <Button as="input" type="btn" value="Submit" onClick={handleSubmitRecipe} />{' '}
                        </div>
                    </Form.Group>
                </Form>
            </div>
            {
                suggestions.length !== 0 && 
                (<div className='col-4 margin-top-md'>
                    <h4>Would you like to add the following to your shopping list?</h4>
                    <ListGroup>
                    {
                        suggestions.map(s => {
                         return <ListSuggestion key={s} item={s} onClick={handleListSuggestionAction}/>
                        })
                    }
                    </ListGroup>
                   
            </div>)}
           
        </Layout>
    )
}

export default NewRecipe;