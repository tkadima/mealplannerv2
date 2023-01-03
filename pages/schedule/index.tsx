import Layout from '../../components/layout';
import React, { useEffect, useState } from 'react'; 
import { Table } from 'react-bootstrap';
import Cell from '../../components/schedule/cell';
import ScheduleModal from '../../components/schedule/schedule-modal';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';
import { DAYS, Meal, MEALS, Recipe } from '../../components/types';

type PropTypes = {
	recipes: Recipe[],
	meals: Meal[]
}

const Schedule = ({recipes, meals}: PropTypes) => {
	
	const dayKeys = Object.keys(DAYS);
	const mealKeys = Object.keys(MEALS); 

	const [showModal, setShowModal] = useState(false); 
	const [selectedMeal, setSelectedMeal] = useState(null); 
	const [scheduleData, setScheduleData] = useState({});

	const handleSelectCell = (mealData: Meal) => {
		setSelectedMeal(mealData); 
		setShowModal(true);
	};

	const handleSaveMeal = () => {
		// save meal mutation 

	};

	const handleCloseModal = () => { 
		setShowModal(false); 
	};

	const initializeScheduleData  = () => {
		
		const scheduleData = {}; 
		dayKeys.forEach(day => {
			const mealsForDay = meals.filter(meal => meal.day === DAYS[day]); 
			scheduleData[day] = {};
			mealKeys.forEach(meal => {
				const mealForDayandType = mealsForDay.filter(m => m.mealType === MEALS[meal])[0]; 
				scheduleData[day][meal] = mealForDayandType; 
			});
		});
		console.log(scheduleData['Sunday']['Breakfast']);
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
							dayKeys.map((day, i) => {
								return <tr key={i}>
									<td>{day}</td>
									{ 
										mealKeys.map((meal, i) => {
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
	const meals = await prisma.meal.findMany();
	return {
		props: {
			recipes, 
			meals
		}
	};
};