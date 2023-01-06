import React, { useEffect, useState } from 'react'; 
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import Layout from '../../components/layout';
import { Ingredient } from '../../components/types';

const ShoppingList = () => {
	type ListItem = {
		id: number, 
		ingredient: Ingredient,
		have: boolean
	}
	const list = [
		{id: 1, ingredient: {quantity: 4, unitOfMeasure: 'bottle', description: 'rice'}, have: false},
		{id: 2, ingredient: {quantity: 6, unitOfMeasure: null, description: 'banana'}, have: true},
		{id: 3, ingredient: {quantity: 1, unitOfMeasure: 'cup', description: 'peanut butter'}, have: false},
		{id: 4, ingredient: {quantity: 1.5, unitOfMeasure: 'cup', description: 'coconut milk'}, have: false}
	] as ListItem[];

	const [shoppingList, setShoppingList] = useState<ListItem[]>([]); 

	useEffect(()=> {
		setShoppingList(list);
	}, []);

	const handleCheckListItem = (listItem: ListItem) => {
		const checkedList = shoppingList.map(l => {
			if (l.id === listItem.id)
				return {...l, have: !l.have};
			else return l;
		});
		setShoppingList(checkedList);
	};

	return <Layout>
        Shopping List:
		<ListGroup>
			{
				shoppingList.map((l, i) => {
					return l && (<ListGroupItem key={i} disabled={l.have}>
						{l.ingredient.description}
						({l.ingredient.quantity} {l.ingredient.unitOfMeasure}) 
						<Form.Check onChange={() => handleCheckListItem(l)}></Form.Check>
					</ListGroupItem>);
				})
			}
		</ListGroup>
	</Layout>;
};

export default ShoppingList;