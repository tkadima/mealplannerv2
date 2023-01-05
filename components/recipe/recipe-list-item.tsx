import { BsFillTrashFill } from 'react-icons/bs';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import { Recipe } from '../types';

type PropTypes = {
    recipeItem: Recipe,
    onDelete: (item: Recipe) => void
}
const RecipeListItem = ({ recipeItem, onDelete } : PropTypes) => {
	const handleDeleteRecipe = () => {
		onDelete(recipeItem);
	};

	return (
		<ListGroup.Item>
			<Link href={`/recipes/${recipeItem.id}`}>{recipeItem.name}</Link>
			<div className="float-right">
				<BsFillTrashFill onClick={handleDeleteRecipe}></BsFillTrashFill>
			</div>
		</ListGroup.Item>
	);
};

export default RecipeListItem;
