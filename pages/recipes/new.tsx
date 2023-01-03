import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import { ADD_RECIPE } from '../../graphql/mutations/recipe-mutations';
import { Recipe } from '../../components/types';

const NewRecipe = () => { 
	const router = useRouter();

	const [createRecipe] = useMutation(ADD_RECIPE, {
		onError(err) {
			console.log('error creating recipe', JSON.stringify(err, null, 2));
		},
		onCompleted(){
			router.push('/recipes');
		}
	});
	
	const handleSubmitRecipe = (recipe: Recipe) => {	
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