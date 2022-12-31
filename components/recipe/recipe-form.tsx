import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Recipe } from '../../pages/types';


type PropTypes = {
	onSubmitRecipe: (data: Recipe) => void;
}
const RecipeForm = ({ onSubmitRecipe }: PropTypes) => {
	

	const { register, handleSubmit } = useForm({
		defaultValues: { 
			name: '', 
			instructions: '', 
			prepTime: 0, 
			cookTime: 0, 
			serves: 0
		}
	});

	const handleSubmitRecipe = (recipe: Recipe )=> {
		onSubmitRecipe(recipe);
	};

	
	return (
		<Form onSubmit={handleSubmit(handleSubmitRecipe)}>
			<Form.Group>
				<Form.Control
					as="input"
					name="name"
					placeholder="Enter recipe title"
					style={{ marginBottom: '30px' }}
					{...register('name', { required: true })}
				/>

				<Form.Control
					as="textarea"
					name="instructions"
					rows={7}
					placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
					{...register('instructions')}
				/>

				<InputGroup style={{ padding: '20px' }}>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="prepTime"
						placeholder="Add prep time (minutes)"
						{...register('prepTime')}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="cookTime"
						placeholder="Add cook time (minutes)"
						{...register('cookTime')}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="serves"
						placeholder="Number of servings"
						{...register('serves')}
					/>
				</InputGroup>
			</Form.Group>
			<div className="col text-center" style={{ paddingTop: '60px'}} >
				<Button type="submit">Submit</Button>
			</div>
		</Form>);

	// move submit button here? 
};

export default RecipeForm;
