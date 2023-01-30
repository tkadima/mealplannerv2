import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import { ADD_RECIPE } from '../../graphql/mutations/recipe-mutations';
import { Recipe } from '../../components/types';
import BackButton from '../../components/back-button';

const NewRecipe = () => { 
	const router = useRouter();

	const [createRecipe] = useMutation(ADD_RECIPE, {
		onError(err) {
			console.error('error creating recipe', JSON.stringify(err, null, 2));
		},
		onCompleted(data){
			// if we don't need to save ingredients, route to /ingredients/id
			router.push(`/recipes/save-ingredients/${data.createRecipe.id}`);
		}
	});
	
	const handleSubmitRecipe = (recipe: Recipe) => {
		createRecipe({ variables: recipe});
	};

	return (
		<Layout>
			<BackButton link="/recipes"/>
			<h3>Create New Recipe</h3>
			<div className=' recipe-form'>
				<RecipeForm onSubmitRecipe={handleSubmitRecipe}/>
			</div>
		</Layout>
	);
};

export default NewRecipe;