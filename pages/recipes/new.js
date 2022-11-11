import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import createSuggestionList from "../../helpers/shopping-list";
import Layout from "../../components/layout";
import data from '../../data.json'
import ListSuggestion from '../../components/list-suggestion';
import { addItem, removeItem } from '../../redux/shopping-list-slice';
import { addRecipe } from '../../redux/recipe-slice'
import Link from 'next/link'


const NewRecipe = () => {

    const dispatch = useDispatch();
    const { shoppingList } = useSelector(state => state.shoppingList);

    const [recipe, setRecipe] = useState({})
    const [suggestions, setSuggestions] = useState([]);
    const [submitted, setSubmitted] = useState(false)


    const handleChangeForm = (e) => {
        e.preventDefault();
        setRecipe({...recipe, [e.target.name]: e.target.value})
    }

    const handleSubmitRecipe = (e) => {
        e.preventDefault();
        dispatch(addRecipe(recipe))
        let list = createSuggestionList(recipe, data.fridge);
        setSuggestions(list);
        setSubmitted(true);
    }

    const handleListSuggestionAction = (response, listItem) => {
        if (response === "yes" && !shoppingList.includes(listItem)) {
            dispatch(addItem(listItem))
        }
        if (response === "already-have") {}// add to fridge
    }

    const handleUndoSelection = (listItem) => {
        dispatch(removeItem(listItem))
    }

    const handleReset = () => {
        setRecipe('')
        setSuggestions([])
        setSubmitted(false)
    }


    return (
        <Layout>
            <h3>Create New Recipe</h3>
            <div className="new recipe" style={{ padding: '10px 0px'}}>
                <div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
                    <Form onSubmit={handleSubmitRecipe}>
                        <Form.Group>
                            <Form.Control as="input" name="name" value={recipe.name} onChange={handleChangeForm}/>
                            <Form.Control as="textarea" name="ingredients" rows={7} value={recipe.ingredients} onChange={handleChangeForm}/>
                            <div className="col text-center" style={{ paddingTop: '10px'}}  value={recipe.ingredients}>
                                <Button onClick={handleSubmitRecipe} disabled={submitted} type="submit">Submit</Button>
                                <Button onClick={handleReset} variant="danger" type="reset" defaultValue="Reset" style={{ marginLeft: '20px'}}>Reset</Button>
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
                            return <ListSuggestion 
                                key={s} 
                                item={s} 
                                onAnswerSuggestion={handleListSuggestionAction}
                                onUndoAnswer={handleUndoSelection}
                                />
                            })
                        }
                        </ListGroup>
                        <Link href="/recipes">
                            <Button>Finish</Button>
                        </Link>
                    </div>)
                }
            </div>
        </Layout>
    );
}

export default NewRecipe;