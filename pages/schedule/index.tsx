import Layout from '../../components/layout';
import React, { useState } from 'react'; 
import { Table } from 'react-bootstrap';
import Cell from '../../components/schedule/cell';
import ScheduleModal from '../../components/schedule/schedule-modal';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';
import { Recipe } from '../../components/types';

type PropTypes = {
	recipes: Recipe[]
}

const Schedule = ({recipes}: PropTypes) => {
	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
	const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']; 

	const [showModal, setShowModal] = useState(false); 
	const [selectedDay, setSelectedDay] = useState(null); 
	const [selectedMeal, setSelectedMeal] = useState(null); 

	const handleSelectCell = (day: string, meal: string) => {
		setSelectedDay(day);
		setSelectedMeal(meal);
		setShowModal(true);
	};

	const handleCloseModal = () => { 
		setShowModal(false); 
	};

	return (
		<Layout>
			<h3>Schedule</h3>
			<ScheduleModal 
				show={showModal} 
				onCloseModal={handleCloseModal} 
				day={selectedDay} meal={selectedMeal} 
				recipes={recipes}/>
			<div>
				<Table bordered>
					<thead>
						<tr>
							<th></th>
							{
								DAYS.map((day, i) => <th key={i}>{day}</th>)
							}
						</tr>
					</thead>
					<tbody>
						{MEALS.map((meal, i) => {
							return <tr key={i}>
								<td>{meal}</td>
								{ 
									DAYS.map((day, i) => {
										return <Cell key={i} onSelectCell={handleSelectCell} dayOfWeek={day} meal={meal} />;
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
	return {
		props: {
			recipes
		}
	};
};