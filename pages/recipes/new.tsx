import React from 'react';
import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../graphql/mutations/recipe-mutations';


const NewRecipe = () => {

	const [createRecipe] = useMutation(ADD_RECIPE, {
		onError(err) {
			console.log('error creating recipe', JSON.stringify(err, null, 2));
		},
	});
	
	const handleSubmitRecipe = (recipe) => {	
		console.log('recipe', recipe);
		createRecipe({ variables: recipe});
	};

	return (
		<Layout>
			<h3>Create New Recipe</h3>
			<div style={{ padding: '10px 0px' }}>
				<div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
					<RecipeForm onSubmitRecipe={handleSubmitRecipe}/>
				</div>
			</div>

		</Layout>
	);
};

export default NewRecipe;