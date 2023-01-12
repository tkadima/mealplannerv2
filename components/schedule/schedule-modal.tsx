import { useQuery } from '@apollo/client';
import React, {  useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import { GET_INGREDIENT_BY_RECIPE_ID } from '../../graphql/queries/ingredient-queries';
import ErrorAlert from '../error-alert';
import { Ingredient, Meal, Recipe } from '../types';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSaveMeal: (selected: Recipe[], unSelected: Recipe[]) => void;
	onSaveIngredients: (ingredientIds: number[]) => void; 
}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSaveMeal, onSaveIngredients} : PropTypes) => {
	const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
	const [removedRecipes, setRemovedRecipes] = useState<Recipe[]>([]); 
	const [ mealIngredients, setMealIngredients] = useState<Ingredient[]>([]); 

	const { control, handleSubmit, setValue, register } = useForm({});
	const {  error, data } = useQuery(GET_INGREDIENT_BY_RECIPE_ID, {
		variables: { recipeIds: mealData?.recipes?.map(r => r.id) }, 
		skip: !mealData?.recipes || mealData?.recipes.length === 0
	});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	useEffect(() => {
		if (error) console.error(error.stack);
		if(mealData?.recipes)  {
			setSelectedRecipes(mealData.recipes);
			setValue('recipes', mealData.recipes.map(r => r.name));
			if(data?.ingredient) {
				const ingredients = data.ingredient.filter(ingredient => {
					return !mealIngredients.some(mi => mi.description === ingredient.description) && 
					!ingredient.isGroupHeader;
				});
				setMealIngredients(ingredients);
			}
		}
	}, [setValue, mealData, data]);

	const handleSaveMeal = (data: {recipes: string[]}) => {
		const recipeList = data.recipes.map(r => nameRecipeMap[r]);
		onSaveMeal(recipeList, removedRecipes);
		const ids = Object.keys(data).filter(key => !isNaN(parseInt(key)) && data[key]).map(key => parseInt(key)); 
		onSaveIngredients(ids);

		setRemovedRecipes([]);
		handleClose();
	};

	const handleChange = (data: MultiValue<{ value: string; label: string; }>) => {
		const prevSelected = selectedRecipes.map(r => r.name);
		const changeNames = data.map(d => d.value);

		setSelectedRecipes(changeNames.map(n => nameRecipeMap[n]));

		setSelectedRecipeIngredients(prevSelected, changeNames);
		setRemovedRecipesIngredients(prevSelected, changeNames); 
	};


	const setSelectedRecipeIngredients = (prevSelected: string[], changeNames: string[]) => {

		const newNames = changeNames.filter((recipeName:string) => !prevSelected
			.includes(recipeName)); 
		
		if (newNames.length > 0) {
			const ingredients = newNames.map(r => nameRecipeMap[r].ingredients).flat(2);
			let newIngredients = []; 

			for (const ingredient of ingredients) {
				if (!newIngredients.some(ni => ni.description === ingredient.description) && !ingredient.isGroupHeader )
					newIngredients = [...newIngredients, ingredient];
			}

			setMealIngredients([...mealIngredients, ...newIngredients]);
		}
	};

	const setRemovedRecipesIngredients = (prevSelected: string[], changeNames: string[]) => {
		const removedNames = prevSelected.filter((recipeName:string) => !changeNames
			.includes(recipeName)); 
		
		if (removedNames.length > 0) {
			const removed = removedNames.map(r => nameRecipeMap[r]);
			setRemovedRecipes(removed);

			const removedIngredients = removed.map(r => r.ingredients).flat(2);
			const updatedMealIngredients = mealIngredients.filter(meal => !removedIngredients
				.some(remove =>  remove.id === meal.id));
			setMealIngredients(updatedMealIngredients);
		}
	};

	const handleClose = () => {
		onCloseModal();
		setMealIngredients([]);
	};

	const recipeOptions = Object.keys(nameRecipeMap).map((name) => ({value: name, label: name}));


	return (<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			{
				mealData && 
				<Modal.Title>{mealData.day} {mealData.mealType}</Modal.Title>
			}
		</Modal.Header>
		<Modal.Body>
			{ 
				error && 
				<ErrorAlert errorMessage={'Error fetching meal data: ' + error.message}/>		
			}
			<Form onSubmit={handleSubmit(handleSaveMeal)}>
				<Form.Label>
                    Select recipes for this meal slot
				</Form.Label>
				<Controller
					name='recipes'
					control={control}
					defaultValue= {mealData?.recipes?.map(r => r.name)}
					render={({ field: { onChange, value, name }}) => (
						<Select
							isMulti
							name={name}
							value={recipeOptions.filter(r => value.includes(r.value))}
							options={recipeOptions}
							onChange={val => {
								onChange(val.map(c => c.value));
								handleChange(val);
							}}
							isClearable
						/>)
					}
				/>
				<div className="form-spacing">
					{
						mealIngredients?.map((ingredient) => {
							return <Form.Check 
								key={ingredient.id} 
								name={ingredient.description} 
								{...register(ingredient.id.toString())} 
								defaultChecked={ingredient.have}
								type='checkbox' 
								label={ingredient.description} 
							/>;
						})
					}
				</div>
				<ButtonGroup className="float-right modal-button-group">
					<Button variant="secondary" 
						onClick={handleClose}>Cancel</Button>
					<Button variant="primary" type="submit">Save</Button> 
				</ButtonGroup>
			</Form>
          
		</Modal.Body>
	</Modal>);
};

export default ScheduleModal; 