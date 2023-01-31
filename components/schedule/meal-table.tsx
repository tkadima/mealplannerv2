import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { DaysOfWeek, Meal, MealTypes } from '../types';
import Cell from './cell';

type PropTypes = {
    scheduleData: object;
    onSelectCell: (mealData: Meal) => void;
	onGenerateReport: (day: string) => void;
}
const MealTable = ({scheduleData, onSelectCell, onGenerateReport}: PropTypes) => {
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 
    
	const generateReport = (value: string) => {
		onGenerateReport(value)
	};

	return (
		<Table bordered>
			<thead>
				<tr>
					<th></th>
					{
						dayKeys.map((day, i) => {
							return <th key={i}>{day}</th>
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
					})
					
				}
				{
					<tr>
						<td></td>
						{dayKeys.map(day => {
							return <td key={day} className="footer-padding">
								<Button onClick={() => generateReport(day)}>Generate report for {day}</Button>
							</td>
						})}
					</tr>
				}
					
			</tbody>
			
		</Table>
	);
};

export default MealTable;