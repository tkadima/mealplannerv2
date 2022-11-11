import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe-list-item';
import { removeRecipe } from '../../redux/recipe-slice';


const Recipes = () => {
    const dispatch = useDispatch();
    const { recipes } = useSelector(state => state.recipes);

    const handleDelete = (recipeName) => {
        let recipeIndex = recipes.findIndex(r => r.name === recipeName);
        dispatch(removeRecipe(recipeIndex));
    }

    return (
        <Layout>
            <h3>Recipes</h3>
            <ListGroup>
                { recipes.map(r => {
                    return <RecipeListItem key={`${r.id}-${r.name}`}id={r.id} name={r.name} onDelete={handleDelete}/>})
                }
            </ListGroup>
            <div className="col text-center padding-md">
                <Link href="/recipes/new">
                    <Button>Add New</Button>
                </Link>
            </div>
        </Layout>

    );
}

export default Recipes;