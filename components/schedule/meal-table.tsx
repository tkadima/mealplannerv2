import React from 'react';
import { Table } from 'react-bootstrap';

import { DaysOfWeek, Meal, MealTypes } from '../types';
import Cell from './cell';

type PropTypes = {
    scheduleData: object; // create type ? 
    onSelectCell: (mealData: Meal) => void;
	onSelectHeaderCell: (day: string) => void;
}
const MealTable = ({scheduleData, onSelectCell, onSelectHeaderCell}: PropTypes) => {
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 
    
	const selectHeaderCell = (value: string) => {
		onSelectHeaderCell(value)
	};

	const hoverHeaderCell = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '#D3D3D3';
	};

	const unHoverHeaderCell = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '';
	};

	return (
		<Table bordered>
			<thead>
				<tr>
					<th></th>
					{
						dayKeys.map((day, i) => {
							return <th key={i} onClick={() => selectHeaderCell(day)} 
							onMouseOver={hoverHeaderCell} 
							onMouseLeave={unHoverHeaderCell}>{day}</th>
					    })
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