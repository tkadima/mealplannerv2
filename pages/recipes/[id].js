import { Button } from "react-bootstrap";
import Layout from "../../components/layout";
import RecipeForm from "../../components/recipe-form";
import data from '../../data.json';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipe } from '../../redux/recipe-slice';
import { useState } from "react";


const Recipe = ({recipe}) => {
    const [changes, setChanges] = useState(null);


    const dispatch = useDispatch();

    const handleSubmitRecipe = () => {
        console.log('updated', changes)
        dispatch(editRecipe(changes));
    }

    const handleChangeRecipe = (updatedRecipe) => {
        setChanges(updatedRecipe);
    }

    return <Layout>
        <RecipeForm recipe={recipe} onChangeRecipe={handleChangeRecipe} op='edit'/>
        <div className="col text-center" style={{ paddingTop: '100px'}}  >
            <Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
         </div>
    </Layout>
}
export default Recipe;


export async function getStaticPaths() {
    const paths = data.recipes.map(r => ({
        params: {id: r.id.toString()}
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({params}) {
    const recipe = data.recipes.find(r => r.id.toString() === params.id)
    return {
        props: {
            recipe
        }
    }
}
