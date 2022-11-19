import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Link from 'next/link';

import {createSuggestionList} from '../../helpers';
import Layout from "../../components/layout";
import data from '../../pages/api/data.json'
import SuggestionListItem from '../../components/suggestion-list-item';
import { addRecipe } from '../../redux/recipe-slice'
import RecipeForm from '../../components/recipe-form';
import React from 'react';
import { SimpleRecipe } from '../../types';

const NewRecipe = () => {

    const dispatch = useDispatch();

    const [recipe, setRecipe] = useState<SimpleRecipe>(
        {id: 0, name: '', ingredients: '', instructions: '',  prepTime: '', cookTime: ''});
    const [shoppingSuggestions, setShoppingSuggestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    const handleSubmitRecipe = (e) => {
        e.preventDefault();
        dispatch(addRecipe(recipe));
        if (recipe) {
            // need to figure out orm 
            // let list = createSuggestionList(recipe, data.fridge);
            // setShoppingSuggestions(list);
        }
        setSubmitted(true);
    }

    const createRecipe = (recipe) => {
        setRecipe(recipe);
    }

    return (
        <Layout>
            <h3>Create New Recipe</h3>
            <div style={{ padding: '10px 0px'}}>
                <div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
                    <RecipeForm recipe={recipe} onRecipeChange={createRecipe}/>
                    <div className="col text-center" style={{ paddingTop: '60px'}} >
                        <Button onClick={handleSubmitRecipe} disabled={submitted} type="submit">Next Step</Button>
                    </div>
                </div>
                {
                    shoppingSuggestions.length > 0 && 
                    (<div style={{ width:'40%', float:'right',  paddingTop: '30px'}}>
                        <h5>Would you like to add the following to your shopping list?</h5>
                        <ListGroup>
                        {
                            shoppingSuggestions.map(s => {
                            return <SuggestionListItem key={s} item={s} type="shopping-list" />
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