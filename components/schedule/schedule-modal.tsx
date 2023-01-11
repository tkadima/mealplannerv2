import React, {  useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';

import { Ingredient, Meal, Recipe } from '../types';


type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSave: (selected: Recipe[], unSelected: Recipe[]) => void;// rename 
	// Add onSaveIngredients ingredients[] -> void 
}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSave} : PropTypes) => {
	const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
	const [removedRecipes, setRemovedRecipes] = useState<Recipe[]>([]); 
	const [ mealIngredients, setMealIngredients] = useState<Ingredient[]>([]); 

	const { control, handleSubmit, setValue, register } = useForm({});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	useEffect(() => {
		if(mealData?.recipes)  {
			setValue('recipes', mealData?.recipes.map(r => r.name));
		}
	}, [setValue, mealData]);

	const handleSaveMeal = (data: {recipes: string[]}) => { // possible rename 
		console.log('data', data);
		const recipeList = data.recipes.map(r => nameRecipeMap[r]);
		onSave(recipeList, removedRecipes);
		// save ingredients list 
		// reset ingredients list 
		setRemovedRecipes([]);
		onCloseModal();
	};

	// refactor a lot! 
	const handleChange = (data: MultiValue<{ value: string; label: string; }>) => {
		const prevSelected = selectedRecipes.map(r => r.name);
		const changeNames = data.map(d => d.value); 

		const newNames = changeNames.filter((recipeName:string) => !prevSelected
			.includes(recipeName)); 

		if (newNames.length > 0) {
			const ingredients = newNames.map(r => nameRecipeMap[r].ingredients).flat(2);
			getIngredientsFromSelectedRecipes(ingredients);
		}

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

		setSelectedRecipes(changeNames.map(n => nameRecipeMap[n]));
	};

	const getIngredientsFromSelectedRecipes = (ingredients: Ingredient[]) => {
		let newIngredients = []; 
		// use filter ? 
		for (const ingredient of ingredients) {
			if (!newIngredients.some(ni => ni.description === ingredient.description) && !ingredient.isGroupHeader )
				newIngredients = [...newIngredients, ingredient];
		}
		setMealIngredients([...mealIngredients, ...newIngredients]);
	};

	const recipeOptions = Object.keys(nameRecipeMap).map((name) => ({value: name, label: name}));

	return (<Modal show={show} onHide={() => onCloseModal()}>
		<Modal.Header closeButton>
			{
				mealData && 
				<Modal.Title>{mealData.day} {mealData.mealType}</Modal.Title>
			}
		</Modal.Header>
		<Modal.Body>
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
						mealIngredients?.map((ingredient, i) => {
							return <Form.Check key={i} name={ingredient.description} 
								{...register(`${ingredient.id}`)}
								type='checkbox' label={ingredient.description} />;
						})
					}
				</div>
				<ButtonGroup className="float-right modal-button-group">
					<Button variant="secondary" 
						onClick={() => { 
							onCloseModal();
							setMealIngredients([]);
						}}>
								Cancel</Button>
					<Button variant="primary" type="submit">Save</Button> 
				</ButtonGroup>
			</Form>
          
		</Modal.Body>
	</Modal>);
};

export default ScheduleModal; 