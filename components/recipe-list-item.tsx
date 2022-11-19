import { BsFillTrashFill } from 'react-icons/bs'
import Link from 'next/link'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react'

type PropTypes = {
    id: Number,
    name: string
    onDelete: Function
}
const RecipeListItem = ({ name, id, onDelete} : PropTypes) => {
  const handleDeleteRecipe = () => {
    onDelete(name)
  }
  return (
        <ListGroup.Item>
            <Link href={`/recipes/${id}`}>{name}</Link>
        <div style={{ float: 'right' }}>
            <span style={{ margin: '20px' }}>
                <BsFillTrashFill onClick={handleDeleteRecipe}></BsFillTrashFill>
            </span>
        </div>
        </ListGroup.Item>
  )
}

export default RecipeListItem
