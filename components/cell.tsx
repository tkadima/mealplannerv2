/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'; 

type PropTypes = {
    onSelectCell: (day: string, meal: string) => void; 
    dayOfWeek: string
    meal: string
}
const Cell = ({onSelectCell, dayOfWeek, meal }: PropTypes) => {
	const selectCell = () => {
		onSelectCell(dayOfWeek, meal);
	};

	const hoverCell = (e: any) => {
		e.target.style.background = '#D3D3D3';
	};

	const unHoverCell = (e: any) => {
		e.target.style.background = '';
	};
    
	return (<td style={{ padding: '30px'}} onClick={selectCell} onMouseOver={hoverCell} onMouseLeave={unHoverCell}>
        Just testing
	</td>);
};

export default Cell; 