import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import Layout from "../../components/layout";
import RecipeForm from '../../components/recipe-form';
import React from 'react';
import { Recipe } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';


type PropTypes = {
    recipes: Recipe[],
    setRecipes: Function
}

const NewRecipe = ({recipes, setRecipes}: PropTypes) => {

    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe>(
        {id: 0, name: '', ingredients: null, instructions: '',  prepTime: null, cookTime: null, yields: null});
   // const [shoppingSuggestions, setShoppingSuggestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    const handleSubmitRecipe = async() => {
        axios.post('/api/recipes', recipe)
            .then(res => {
                setRecipes([...recipes, recipe])
                setSubmitted(true);
                if (res.status === 200) router.push('/recipes')
            })
            .catch(error => {
                console.error(error)
            })
       
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