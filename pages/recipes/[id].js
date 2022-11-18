import { Button } from "react-bootstrap";
import Layout from "../../components/layout";
import RecipeForm from "../../components/recipe-form";
import { useDispatch } from 'react-redux';
import { editRecipe } from '../../redux/recipe-slice';
import { useState } from "react";
import { parseIngredient } from "parse-ingredient";
import { useRouter } from 'next/router'
import { normalizeIngredients } from '../../helpers';
import { store } from "../../store";


const Recipe = ({recipe}) => {
    const [changes, setChanges] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(Object.freeze(recipe)); 

    const router = useRouter();

    const dispatch = useDispatch();

    const handleSubmitRecipe = () => {
        try {
            let normalizedRecipe = {...recipeToEdit}
            if (normalizedRecipe.ingredients) {
                normalizedRecipe = {...recipeToEdit, ingredients: parseIngredient(normalizedRecipe.ingredients)}
            }
            dispatch(editRecipe(normalizedRecipe));
        } catch (error) {
            console.error("Didn't work b/c ", error)
        }
        finally { 
            // if result is 200
            router.push('/recipes')
        }
        
    }

    const handleChangeRecipe = (recipeUpdates, newRecipe) => {
        setRecipeToEdit(newRecipe);
        setChanges(recipeUpdates);
    }

    return <Layout>
        <RecipeForm recipe={recipeToEdit} onEditRecipe={handleChangeRecipe} op='edit' />
        <div className="col text-center" style={{ paddingTop: '100px'}}  >
            <Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
         </div>
    </Layout>
}
export default Recipe;


// for now initial store with data.json 
// data.json could become an api we fetch from - SSR to initialize data, get from store 
// 
export const getStaticPaths = () => {
    let recipes = store.getState().recipes.recipes;
    const paths = recipes.map(r => ({
        params: {id: r.id.toString()}
    }));
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = ({params}) => {
    let recipeData = store.getState().recipes.recipes.filter(r => r.id.toString() === params.id)[0]
    let recipe = {...recipeData, ingredients: normalizeIngredients(recipeData.ingredients)}
    return {
        props: {
            recipe
        }
    }
}

