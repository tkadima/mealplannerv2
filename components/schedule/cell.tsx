/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'; 
import { Meal } from '../types';

type PropTypes = {
    onSelectCell: (mealData: Meal) => void; 
    mealData?: Meal
}

const Cell = ({onSelectCell, mealData}: PropTypes) => {
	const selectCell = () => {
		onSelectCell(mealData);
	};

	const hoverCell = (e: any) => {
		e.target.style.background = '#D3D3D3';
	};

	const unHoverCell = (e: any) => {
		e.target.style.background = '';
	};

	return (<td style={{ padding: '30px'}} 
		onClick={selectCell} 
		onMouseOver={hoverCell} 
		onMouseLeave={unHoverCell}>
		{
			mealData && mealData.recipes && mealData.recipes.map((recipe, i) => {
				return <p key={i}>{recipe.name}</p>;
			})
		}
	</td>);
			
};

export default Cell;