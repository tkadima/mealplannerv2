import Layout from '../../components/layout';
import React, { useState } from 'react'; 
import { Table } from 'react-bootstrap';
import Cell from '../../components/cell';
import ScheduleModal from '../../components/schedule-modal';

const Schedule = () => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
	const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']; 

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
			<ScheduleModal show={showModal} onCloseModal={handleCloseModal} day={selectedDay} meal={selectedMeal}/>
			<div>
				<Table bordered>
					<thead>
						<tr>
							<th></th>
							{
								days.map((day, i) => <th key={i}>{day}</th>)
							}
						</tr>
					</thead>
					<tbody>
						{meals.map((meal, i) => {
							return <tr key={i}>
								<td>{meal}</td>
								{ 
									days.map((day, i) => {
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