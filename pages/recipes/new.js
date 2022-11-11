import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import createShoppingList from "../../helpers/shopping-list";
import Layout from "../../components/layout";
import data from '../../data.json'
import ListSuggestion from '../../components/list-suggestion';
import { addItem } from '../../redux/shopping-list-slice';


const NewRecipe = () => {

    const dispatch = useDispatch();
    const { shoppingList } = useSelector(state => state.shoppingList)

    const [recipe, setRecipe] = useState(null)
    const [suggestions, setSuggestions] = useState([]); 

    const handleChangeRecipe = (event) => {
        setRecipe(event.target.value);
    }

    const handleSubmitRecipe = () => {
        let list = createShoppingList(recipe, data.fridge);
        setSuggestions(list);
    }

    const handleListSuggestionAction = (response, listItem) => {
        if (response === "yes" && !shoppingList.includes(listItem)) {
            dispatch(addItem(listItem))
        }
        if (response === "no") {} // do nothing 
        if (response === "already-have") {}// add to fridge
    }

    return (
        <Layout>
            <h3>Create New Recipe</h3>
            <div className="new recipe" style={{ padding: '10px 0px'}}>
                <div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={7} onChange={handleChangeRecipe}/>
                            <div className="col text-center">
                                <Button as="input" type="btn" value="Submit" onClick={handleSubmitRecipe} />{' '}
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                {
                    suggestions.length !== 0 && 
                    (<div style={{ width:'40%', float:'right',  paddingTop: '30px'}}>
                        <h5>Would you like to add the following to your shopping list?</h5>
                        <ListGroup>
                        {
                            suggestions.map(s => {
                            return <ListSuggestion key={s} item={s} onClick={handleListSuggestionAction}/>
                            })
                        }
                        </ListGroup>
                    
                    </div>)
                }
            </div>
        </Layout>
    )
}

export default NewRecipe;