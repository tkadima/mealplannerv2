import React, {  useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import ModalWrapper from '../modal-wrapper';
import { Meal, Recipe } from '../types';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSaveMeal: (selected: Recipe[], unSelected: Recipe[]) => void;}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSaveMeal } : PropTypes) => {
	const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
	const [removedRecipes, setRemovedRecipes] = useState<Recipe[]>([]); 

	const { control, handleSubmit, setValue } = useForm({});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	useEffect(() => {
		if(mealData?.recipes)  {
			setSelectedRecipes(mealData.recipes);
			setValue('recipes', mealData.recipes.map(r => r.name));
		}
	}, [setValue, mealData]);

	const handleSaveMeal = (data: {recipes: string[]}) => {
		const recipeList = data.recipes.map(r => nameRecipeMap[r]);
		onSaveMeal(recipeList, removedRecipes);

		setRemovedRecipes([]);
		onCloseModal();
	};

	const handleChange = (data: MultiValue<{ value: string; label: string; }>) => {
		const prevSelected = selectedRecipes.map(r => r.name);
		const changeNames = data.map(d => d.value);

		setSelectedRecipes(changeNames.map(n => nameRecipeMap[n]));

		removeSelectedRecipes(prevSelected, changeNames); 
	};

	const removeSelectedRecipes = (prevSelected: string[], changeNames: string[]) => {
		const removedNames = prevSelected.filter((recipeName:string) => !changeNames
			.includes(recipeName)); 
		
		if (removedNames.length > 0) {
			const removed = removedNames.map(r => nameRecipeMap[r]);
			setRemovedRecipes(removed);
		}
	};

	const recipeOptions = Object.keys(nameRecipeMap).map((name) => ({value: name, label: name}));

	return (<ModalWrapper show={show} title={`${mealData?.day} ${mealData?.mealType}`} onHide={() => onCloseModal()}>
			<Form onSubmit={handleSubmit(handleSaveMeal)}>
				<Form.Label htmlFor='recipes'>
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
					<Button variant="secondary" 
						onClick={() => onCloseModal()}>Cancel</Button>
					<Button variant="primary" type="submit">Save</Button> 
				</ButtonGroup>
			</Form>
			</ModalWrapper>);
};

export default ScheduleModal; 