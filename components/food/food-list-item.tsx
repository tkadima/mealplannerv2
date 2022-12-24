import React from 'react';
import { Form, FormGroup, ListGroupItem } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import FoodButtonGroup from './food-button-group';

type PropTypes = {
    foodName: string,
    id: number,
    onClickEditButton?: (foodId: number) => void; 
    onClickDelete?: (foodId: number) => void;
    isEdit: boolean
    onChangeFood?: (change:string) => void;
    onCancel?: () => void; 
    onSubmit?: () => void; 
}
const FoodListItem = ({foodName, id, onClickEditButton, onClickDelete, isEdit, onChangeFood, onCancel, onSubmit}: PropTypes) => {


	const handleDeleteFoodItem = () => {
		onClickDelete(id);
	};

	const handleEditFoodItem = () => {
		onClickEditButton(id); 
	};

	const handleChangeFood = (e: { target: {name: string, value: string}}) => {
		onChangeFood(e.target.value);
	};

	const handleClickCancel = () => {
		onCancel(); 
	};

	const handleClickSubmit = () => {
		onSubmit(); 
	};
 
	return (
		<ListGroupItem>
			{
				isEdit ? 
					<FormGroup >
						<Form.Control
							as="input"
							name="name"
							value={ foodName }
							onChange={handleChangeFood}
							style={{ marginBottom: '30px', width: '50%' }}
							placeholder="Enter recipe title"
						/>
						<FoodButtonGroup onClickCancel={handleClickCancel} onClickSubmit={handleClickSubmit}/>
					</FormGroup>
					:
					<>
						{foodName}
						<div style={{ float: 'right' }}>
							<span style={{ margin: '20px' }}>
								<BsFillPencilFill style={{margin: '10px'}} onClick={() => handleEditFoodItem()}> 
								</BsFillPencilFill>
								<BsFillTrashFill onClick={() => handleDeleteFoodItem()}></BsFillTrashFill>
							</span>
						</div>
					</>
			}
		</ListGroupItem>
	);
};

export default FoodListItem;