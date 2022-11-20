import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';

import Layout from "../../components/layout";
import { addRecipe } from '../../redux/recipe-slice'
import RecipeForm from '../../components/recipe-form';
import React from 'react';
import { Recipe } from '../../types';
import { useRouter } from 'next/router';

const NewRecipe = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe>(
        {id: 0, name: '', ingredients: null, instructions: '',  prepTime: null, cookTime: null, servingSize: null});
    const [shoppingSuggestions, setShoppingSuggestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    const handleSubmitRecipe = () => {
        dispatch(addRecipe(recipe));
        router.push('/recipes')

        if (recipe) {
            // need to figure out orm 
            // let list = createSuggestionList(recipe, data.fridge);
            // setShoppingSuggestions(list);
        }
        setSubmitted(true);
    }

    const createRecipe = (recipe: Recipe) => {
        setRecipe(recipe);
    }

    return (
        <Layout>
            <h3>Create New Recipe</h3>
            <div style={{ padding: '10px 0px'}}>
                <div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
                    <RecipeForm recipe={recipe} onRecipeChange={createRecipe} op='add'/>
                    <div className="col text-center" style={{ paddingTop: '60px'}} >
                        <Button onClick={handleSubmitRecipe} disabled={submitted} type="submit">Submit</Button>
                    </div>
                </div>
                {/* {
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
            */}
            </div>

        </Layout>
    );
}

export default NewRecipe;