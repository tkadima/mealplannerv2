import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'; 
import { ListGroupItem } from 'react-bootstrap';
import { Food } from '../types';
import Layout from '../../components/layout';

type PropTypes = {
    foodList: Food[]
}
const FoodPage = ({foodList}: PropTypes) => {
	return(
		<Layout>
			<h3>Fridge Contents</h3>
			{
				foodList.length > 0 && 
				<ListGroup>
					{foodList.map((food, i) => {
						return <ListGroupItem key={i}>
							{food.name}
						</ListGroupItem>;
					})}
				</ListGroup>
			}
		</Layout>

	);
};

export default FoodPage;