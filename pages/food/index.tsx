import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react'; 
import { ButtonGroup, Form, FormGroup, ListGroupItem } from 'react-bootstrap';
import { Food } from '../types';
import Layout from '../../components/layout';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

type PropTypes = {
    foodList: Food[],
	setFoodList: (foodList: Food[]) => void;
}

const FoodListPage = ({foodList, setFoodList}: PropTypes) => {
	const [newFood, setNewFood] = useState({name: ''}); 
	const [adding, setAdding] = useState(false); 
	const [editFood, setEditFood] = useState({id: null, name: ''});

	const handleAddingFood = () => {
		setAdding(true); 
	};

	const handleCancelAddingFood = () => {
		setAdding(false);
		setNewFood({name: ''});
	};

	const handleChangeFoodName = (e : { target: { value: string }}) => {
		if (adding) setNewFood({'name': e.target.value});
		else setEditFood({...editFood, 'name': e.target.value});
	};

	const handleSubmitFood = () => {
		if (adding) { 
			axios.post('/api/food', newFood)
				.then(res => {
					if (res.status === 200) {
						setFoodList([...foodList, res.data]); 
						setNewFood({name: ''});
						setAdding(false);
					}
				})
				.catch(err => {
					console.error('Error submitting', err); 
				});
		}
		else {
			axios.put(`/api/food/${editFood.id}`, editFood)
				.then(res => {
					if (res.status === 200) {
						const updatedFoodList = foodList.map(food => {
							const value = {...food};
							if (food.id === res.data.id) {
								value.name = res.data.name;
							}
							
							return value; 
						});
						setFoodList(updatedFoodList);
						setEditFood({id: null, name: ''});
					} 
				})
				.catch(err => {
					console.error('error occured while updating', err);
				});
		}
	};  

	const handleEditFood = (id: number) => {
		setAdding(false);
		setEditFood(foodList.find(food => food.id === id));
	};

	const handleCancelEditting = () => {
		setEditFood({id: null, name: ''});
		setNewFood({name: ''});
	};

	const handleDeleteFood = (id: number) => {
		axios.delete(`/api/food/${id}`)
			.then(res => {
				if (res.status === 200) {
					const newFoodList = foodList.filter(f => f.id !== id);
					setFoodList(newFoodList);
				}
			})
			.catch(err => {
				console.error('Error deleting food', err);
			});
	};

	return(
		<Layout>
			<h3>Fridge Contents</h3>
			{
				foodList.length > 0 && 
				<ListGroup>
					{foodList.map((f, i) => {
						return f.id === editFood.id ? 
							(
								<ListGroupItem key={i}>
									<FormGroup >
										<Form.Control
											as="input"
											name="name"
											value={adding ? newFood.name : editFood.name}
											onChange={handleChangeFoodName}
											style={{ marginBottom: '30px', width: '50%' }}
											placeholder="Enter recipe title"
										/>
										<ButtonGroup style={{ float: 'right' }}>
											<Button variant='secondary' onClick={handleCancelEditting}>Cancel</Button>
											<Button onClick={handleSubmitFood}>Submit</Button>
										</ButtonGroup>
									</FormGroup>
								</ListGroupItem>
							) : 
							(<ListGroupItem key={i}>
								{f.name}
								<div style={{ float: 'right' }}>
									<span style={{ margin: '20px' }}>
										<BsFillPencilFill onClick={() => handleEditFood(f.id)}></BsFillPencilFill>
										<BsFillTrashFill onClick={() => handleDeleteFood(f.id)}></BsFillTrashFill>
									</span>
								</div>
							</ListGroupItem>);
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

export default FoodListPage;