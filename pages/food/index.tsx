import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react'; 
import { ButtonGroup, Form, ListGroupItem } from 'react-bootstrap';
import { Food } from '../types';
import Layout from '../../components/layout';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

type PropTypes = {
    foodList: Food[],
	setFoodList: (foodList: Food[]) => void;
}

const FoodPage = ({foodList, setFoodList}: PropTypes) => {
	const [newFood, setNewFood] = useState({name: ''}); 
	const [adding, setAdding] = useState(false); 

	
	const handleSubmitFood = () => {
		axios.post('/api/food', newFood)
			.then(res => {
				if (res.status === 200) {
					setFoodList([...foodList, res.data]); 
					setNewFood({name: ''});
				}
			})
			.catch(err => {
				console.log('Error submitting', err); 
			});
	};  

	const handleAddingFood = () => {
		setAdding(true); 
	};

	const handleCancelAddingFood = () => {
		setAdding(false);
		setNewFood({name: ''});
	};

	const handleChangeFoodName = (e : { target: { value: string }}) => {
		setNewFood({'name': e.target.value});
	};

	return(
		<Layout>
			<h3>Fridge Contents</h3>
			{
				foodList.length > 0 && 
				<ListGroup>
					{foodList.map((f, i) => {
						return <ListGroupItem key={i}>
							{f.name}
						</ListGroupItem>;
					})}
				</ListGroup>
			}
			{
				adding && 
					<Form>
						<Form.Control
							as="input"
							name="name"
							value={newFood.name}
							onChange={handleChangeFoodName}
							style={{ marginBottom: '30px' }}
							placeholder="Enter recipe title"
						/>
					</Form>
			}
			<div className="col text-center padding-md">
				{
					adding ? <ButtonGroup>
						<Button variant="secondary" onClick={handleCancelAddingFood}>Cancel</Button>
						<Button variant="primary" onClick={handleSubmitFood}>Submit</Button>
					</ButtonGroup>
						:
						<Button onClick={handleAddingFood}>Add New</Button>
				}
			</div>
		</Layout>

	);
};

export default FoodPage;