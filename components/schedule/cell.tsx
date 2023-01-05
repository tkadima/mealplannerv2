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

	const hoverCell = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '#D3D3D3';
	};

	const unHoverCell = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '';
	};

	return (<td style={{ padding: '30px'}} 
		onClick={selectCell} 
		onMouseOver={hoverCell} 
		onMouseLeave={unHoverCell}>
		{
			mealData && mealData.recipes && mealData.recipes.map((recipe, i) => {
				return <p key={i}
					onMouseOver={hoverCell} 
					onMouseLeave={unHoverCell}>
					{recipe.name}
				</p>;
			})
		}
	</td>);
			
};

export default Cell;