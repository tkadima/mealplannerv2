import React from 'react'; 
import {  ListGroup, ListGroupItem } from 'react-bootstrap';
import { Ingredient } from '../../components/types';

type PropTypes = { 
	ingredientList: Ingredient[]
}
const ShoppingList = ({ingredientList}: PropTypes) => 
{
	return <div>
        Shopping List:
		<ListGroup>
			{
				ingredientList.map((l, i) => {
					return l && (<ListGroupItem key={i} disabled={l.have}>
						{l.description}
						({l.quantity} {l.unitOfMeasure}) 
						{/* <Form.Check onChange={() => handleCheckListItem(l)}></Form.Check> */}
					</ListGroupItem>);
				})
			}
		</ListGroup>
	</div>;
};

export default ShoppingList;