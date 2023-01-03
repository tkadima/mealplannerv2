import Layout from '../../components/layout';
import React, { useEffect, useState } from 'react'; 
import { Table } from 'react-bootstrap';
import Cell from '../../components/schedule/cell';
import ScheduleModal from '../../components/schedule/schedule-modal';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';
import { DaysOfWeek, Meal, MealTypes, Recipe } from '../../components/types';
import { EDIT_MEAL } from '../../graphql/mutations/meal-mutations';
import { useMutation } from '@apollo/client';

type PropTypes = {
	recipes: Recipe[],
	meals: Meal[]
}

const Schedule = ({recipes, meals}: PropTypes) => {
	
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 

	console.log('day', dayKeys);
	console.log('meal', mealKeys); 
	const [showModal, setShowModal] = useState(false); 
	const [selectedMeal, setSelectedMeal] = useState(null); 
	const [scheduleData, setScheduleData] = useState({});

	const [updateMealRecipes] = useMutation(EDIT_MEAL, {
		onError(err) {
			console.log('error creating recipe', JSON.stringify(err, null, 2));
		},
		onCompleted(){
			const updatedData = {...scheduleData, 
				[selectedMeal.day]: {...scheduleData[selectedMeal.day], 
					[selectedMeal.meal]: {...scheduleData[selectedMeal.meal]}
				}};
			setScheduleData(updatedData);
		}
	});

	const handleSelectCell = (mealData: Meal) => {
		setSelectedMeal(mealData); 
		setShowModal(true);
	};

	const handleSaveMeal = (newRecipes: Recipe[]) => {
		const recipeIdList = newRecipes.map(r => r.id);
		updateMealRecipes({variables: { mealId: selectedMeal.id, recipeIdList }});
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
											console.log(day, meal); 
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