import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react'; 
import { ButtonGroup, Form, FormGroup, ListGroupItem } from 'react-bootstrap';
import Layout from '../../components/layout';
import Button from 'react-bootstrap/Button';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { gql, useMutation } from '@apollo/client';
import prisma  from '../../lib/prisma';



const CreateFoodMutation = gql` 
	mutation ($name: String!) {
		createFood(name: $name) {
			id 
			name
		}
	}
`;

const DeleteFoodMutation = gql`
	mutation ($foodId: Int!) { 
		deleteFood(foodId: $foodId) {
			id
			name
		}
	}
`;

type PropTypes = {
	foodList: [];
}

const FoodListPage = ({ foodList }: PropTypes) => {

	const [createFood, { error }] = useMutation(CreateFoodMutation, {
		onCompleted: (data) => {
			const createdFood = data.createFood;
			setAllFood([...allFood, {id: createdFood.id, name: createdFood.name}]);
			setNewFood({name: ''});
			setAdding(false);
		}
	});

	const [deleteFood] = useMutation(DeleteFoodMutation, {
		onCompleted: (data) => {	
			const res = data.deleteFood; 
			console.log('res', res); 
			const newFoodList = allFood.filter(food => food.id !== res.id);
			setAllFood(newFoodList);
		}
	}); 

	const [newFood, setNewFood] = useState({name: ''}); 
	const [adding, setAdding] = useState(false); 
	const [editFood, setEditFood] = useState({id: null, name: ''});
	const [ allFood, setAllFood ] = useState([]);

	useEffect(()=> {
		setAllFood(foodList);
	}, []); 

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
		if (error) console.error(error.message); 
		createFood({ variables: { name: newFood.name }});
	};  

	// const handleEditFood = (id: number) => {
	// 	setAdding(false);
	// 	setEditFood(foodList.find(food => food.id === id));
	// };

	const handleCancelEditting = () => {
		setEditFood({id: null, name: ''});
		setNewFood({name: ''});
	};

	const handleDeleteFood = (id: number) => {
		deleteFood({ variables: { foodId: id}}); 
	};

	return(
		<Layout>
			<h3>Fridge Contents</h3>
			{
				allFood.length > 0 && 
				<ListGroup>
					{allFood.map((f: { id: number, name: string}, i) => {
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
										{/* <BsFillPencilFill style={{margin: '10px'}} onClick={() => handleEditFood(f.id)}> */}
										{/* </BsFillPencilFill> */}
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

export const getServerSideProps = async() => {
	const foodList = await prisma.food.findMany(); 
	return { 
		props: { foodList }
	};
};