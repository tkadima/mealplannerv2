import React from 'react';
import { Table } from 'react-bootstrap';

import { DaysOfWeek, Meal, MealTypes } from '../types';
import Cell from './cell';

type PropTypes = {
    scheduleData: object; // create type ? 
    onSelectCell: (mealData: Meal) => void;
}
const MealTable = ({scheduleData, onSelectCell}: PropTypes) => {
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 
    
	return (
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
										onSelectCell={onSelectCell} 
										mealData={ scheduleData[day] ? scheduleData[day][meal] : null}
									/>;
								})
							}
						</tr>;
					})}
			</tbody>
		</Table>
	);
};

export default MealTable;