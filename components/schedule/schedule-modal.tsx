import React, {  useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';

import { Meal, Recipe } from '../types';


type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSave: (selected: Recipe[], unSelected: Recipe[]) => void;
}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSave} : PropTypes) => {
	const [removedRecipes, setRemovedRecipes] = useState([]); 

	const { control, handleSubmit, setValue} = useForm({});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	useEffect(() => {
		if(mealData?.recipes)  {
			setValue('recipes', mealData?.recipes.map(r => r.name));
		}
	}, [setValue, mealData]);

	const handleSaveMeal = (data: {recipes: string[]}) => {
		const recipeList = data.recipes.map(r => nameRecipeMap[r]);
		onSave(recipeList, removedRecipes);
		setRemovedRecipes([]);
		onCloseModal();
	};

	const handleChange = (data: MultiValue<{ value: string; label: string; }>) => {
		const changeNames = data.map(d => d.value); 
		const mealDataNames = mealData?.recipes?.map(r => r.name);
		const removedNames = mealDataNames.filter((recipeName:string) => !changeNames
			.includes(recipeName)); 
		const removed = removedNames.map(r => nameRecipeMap[r]);
		setRemovedRecipes(removed);
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
				<ButtonGroup className="float-right modal-button-group">
					<Button variant="secondary" onClick={() => onCloseModal()}>Cancel</Button>
					<Button variant="primary" type="submit">Save</Button>
				</ButtonGroup>
			</Form>
          
		</Modal.Body>
	</Modal>);
};

export default ScheduleModal; 