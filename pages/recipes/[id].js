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

    const [recipeToEdit, setRecipeToEdit] = useState({...recipe}); 

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

    const handleChangeRecipe = (newRecipe) => {
        setRecipeToEdit(newRecipe);
    }

    return <Layout>
        <RecipeForm recipe={recipeToEdit} onEditRecipe={handleChangeRecipe} op='edit' />
        <div className="col text-center" style={{ paddingTop: '100px'}}  >
            <Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
         </div>
    </Layout>
}
export default Recipe;

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

