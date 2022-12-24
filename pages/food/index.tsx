import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react'; 
import { Form } from 'react-bootstrap';
import Layout from '../../components/layout';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import prisma  from '../../lib/prisma';
import { CreateFoodMutation, UpdateFoodMutation, DeleteFoodMutation } from '../../graphql/mutations/food-mutations'; 
import FoodListItem from '../../components/food/food-list-item';
import FoodButtonGroup from '../../components/food/food-button-group';


type PropTypes = {
	foodList: [];
}
const FoodListPage = ({ foodList }: PropTypes) => {

	const [createFood] = useMutation(CreateFoodMutation, {
		onCompleted: (data) => {
			const createdFood = data.createFood;
			setAllFood([...allFood, {id: createdFood.id, name: createdFood.name}]);
			setNewFood({name: ''});
			setAdding(false);
		}
	});

	const [updateFood] = useMutation(UpdateFoodMutation, {
		onCompleted: (data) => {
			const res = data.updateFood; 
			const updatedFoodList = allFood.map(food =>  {
				const value = {...food};
				if (res.id === food.id) {
					value.name = res.name;
				}
				return value;
			}); 
			setAllFood(updatedFoodList);
			setEditFood({id: null, name: ''});
		}
	});

	const [deleteFood] = useMutation(DeleteFoodMutation, {
		onCompleted: (data) => {	
			const res = data.deleteFood; 
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

	const handleCancel = () => {
		if (adding) { 
			setAdding(false);
			setNewFood({name: ''});
		}
		else { 
			setEditFood({id: null, name: ''});
			setNewFood({name: ''});
		}
	};

	const handleChangeFoodName = (newName: string) => {
		setEditFood({...editFood, 'name': newName});
	};

	const handleSubmitFood = () => {
		if (adding)
			createFood({ variables: { name: newFood.name }});
		else 
			updateFood({ variables: { foodId: editFood.id, newName: editFood.name}});
	};  

	const handleClickEditButton = (id: number) => {
		setAdding(false);
		setEditFood(foodList.find((food: {id: number}) => food.id === id));
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
						return editFood && f.id === editFood.id ? 
							<>
								<FoodListItem 
									key={i} 
									foodName={editFood.name} 
									id={f.id} 
									isEdit={true} 
									onCancel={handleCancel}
									onSubmit={handleSubmitFood}
									onChangeFood={e => handleChangeFoodName(e)}
								/>
							</>
							: 

							<FoodListItem
								key={i} 
								foodName={f.name} 
								id={f.id} 
								onClickEditButton={handleClickEditButton} 
								onClickDelete={handleDeleteFood}
								isEdit={false}/>;
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
							onChange={(e) => setNewFood({'name': e.target.value})}
							style={{ marginBottom: '30px' }}
							placeholder="Enter recipe title"
						/>
					</Form>
			}
			<div className="col text-center padding-md">
				{
					adding ? <FoodButtonGroup onClickCancel={handleCancel} onClickSubmit={handleSubmitFood}/>
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