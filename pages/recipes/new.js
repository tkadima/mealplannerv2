import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import createSuggestionList from "../../helpers/shopping-list";
import Layout from "../../components/layout";
import data from '../../data.json'
import SuggestionListItem from '../../components/suggestion-list-item';
import { addRecipe } from '../../redux/recipe-slice'
import Link from 'next/link'


const NewRecipe = () => {

    const dispatch = useDispatch();

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
                                    style={{ width: '50%', float: "left", paddingRight: "40px"}}
                                    as="input"
                                    name="prepTime"
                                    placeholder="Enter prep time in minutes"
                                    type="number"
                                    value={recipe.prepTime}
                                    onChange={handleChangeForm}
                                />
                                <Form.Control
                                    style={{ width: '50%', float: "right"}}
                                    as="input" 
                                    name="cookTime" 
                                    placeholder="Enter cooking time in minutes"
                                    value={recipe.cookTime}
                                    onChange={handleChangeForm}
                                />
                            </div>
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
                            return <SuggestionListItem 
                                key={s} 
                                item={s} 
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