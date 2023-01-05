import Layout from '../../components/layout';
import React, { useEffect, useState } from 'react'; 
import { Button, Table } from 'react-bootstrap';
import Cell from '../../components/schedule/cell';
import ScheduleModal from '../../components/schedule/schedule-modal';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';
import { DaysOfWeek, Meal, MealTypes, Recipe } from '../../components/types';
import { CLEAR_MEAL_RECIPES, EDIT_MEAL } from '../../graphql/mutations/meal-mutations';
import { useMutation } from '@apollo/client';

type PropTypes = {
	recipes: Recipe[],
	meals: Meal[]
}

const Schedule = ({recipes, meals}: PropTypes) => {
	
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 

	const [showModal, setShowModal] = useState(false); 
	const [selectedMeal, setSelectedMeal] = useState(null); 
	const [scheduleData, setScheduleData] = useState({});

	const [updateMealRecipes] = useMutation(EDIT_MEAL, {
		onError(err) {
			console.error('error adding recipe to meal', JSON.stringify(err, null, 2));
		},
		onCompleted(data){
			const day = dayKeys.find(d => DaysOfWeek[d] === selectedMeal.day);
			const meal = mealKeys.find(m =>  MealTypes[m] === selectedMeal.mealType);
			const updatedSelectedMeal = {...selectedMeal, recipes: data.updateMealRecipes.recipes};
			const updatedData = {...scheduleData, 
				[day]: {
					...scheduleData[day], 
					[meal]: updatedSelectedMeal
				}};
			setScheduleData(updatedData);
		}
	});

	const [clearMealRecipes] = useMutation(CLEAR_MEAL_RECIPES, {
		onError(err) {
			console.error('error adding recipe to meal', JSON.stringify(err, null, 2));
		},
		onCompleted(){
			const days = Object.keys(scheduleData);  
			let newData = {}; 
			days.forEach(day => {
				const mealsForDay = scheduleData[day];
				const mealTypes = Object.keys(mealsForDay); 
				let newMeals = {};
				mealTypes.forEach(mealType => {
					const mealObj = {...scheduleData[day][mealType], recipes: []}; 
					newMeals = {...newMeals, [mealType]: mealObj};
				}); 
				newData = {...newData, [day]: newMeals};
			});
			setScheduleData(newData); 
		}
	});

	const handleSelectCell = (mealData: Meal) => {
		setSelectedMeal(mealData); 
		setShowModal(true);
	};

	const handleSaveMeal = (newRecipes: Recipe[], deletedRecipes: Recipe[]) => {
		const newRecipeIds = newRecipes?.map(r => r.id);
		const removeRecipeIds = deletedRecipes?.map(r => r.id);
		updateMealRecipes({variables: { mealId: selectedMeal.id, newRecipeIds, removeRecipeIds }});
	};

	const handleResetTable = () => { 
		clearMealRecipes();
	};

	const handleCloseModal = () => { 
		setShowModal(false); 
	};

	const initializeScheduleData  = () => {
		const scheduleData = {}; 
		dayKeys.forEach(day => {
			const mealsForDay = meals.filter(meal => meal.day === DaysOfWeek[day]); 
			scheduleData[day] = {};
			mealKeys.forEach(meal => {
				const mealForDayandType = mealsForDay.filter(m => m.mealType === MealTypes[meal])[0]; 
				scheduleData[day][meal] = mealForDayandType; 
			});
		});
		setScheduleData(scheduleData);
	};

	useEffect(() => {
		initializeScheduleData();
	}, []);

	return (
		<Layout>
			<h3>Schedule</h3>
			<Button variant="primary" style={{ float: 'right'}} onClick={handleResetTable}>Reset Schedule</Button>
			<ScheduleModal 
				show={showModal} 
				onCloseModal={handleCloseModal} 
				mealData={selectedMeal ?? null} 
				recipes={recipes}
				onSave={handleSaveMeal}/>
			<div>
				<Table bordered>
					<thead>
						<tr>
							<th></th>
							{
								dayKeys.map((day, i) => <th key={i}>{day}</th>)
							}
						</tr>
					</thead>
					<tbody>
						{
							mealKeys.map((meal, i) => {
								return <tr key={i}>
									<td>{meal}</td>
									{ 
										dayKeys.map((day, i) => {
											return <Cell 
												key={i} 
												onSelectCell={handleSelectCell} 
												mealData={ scheduleData[day] ? scheduleData[day][meal] : null}
											/>;
										})
									}
								</tr>;
							})}
					</tbody>
				</Table>
			</div>
		</Layout>
	);
};

export default Schedule;


export const getServerSideProps: GetServerSideProps = async () => {
	const recipes = await prisma.recipe.findMany(); 
	const meals = await prisma.meal.findMany({include: { recipes: true }});
	return {
		props: {
			recipes, 
			meals
		}
	};
};