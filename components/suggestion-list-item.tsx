import { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { addItem, removeItem, ShoppingListState } from '../redux/shopping-list-slice'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Item } from '../types'


type PropTypes = {
  item: Item 
  type: string
}

const SuggestionListItem = ({item, type: listType}: PropTypes) => {
  const dispatch = useDispatch()
  const shoppingList  = useSelector((state : ShoppingListState) => state.shoppingList)

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleUndo = () => {
    if (selectedAnswer === 'yes') { dispatch(removeItem(item)) }

    setAnswered(false)
    setSelectedAnswer(null)
  }

  const handleListSuggestionAction = (e) => {
    const response = e.target.value
    if (listType === 'shopping-list') {
      if (response === 'yes' && !shoppingList.includes(item)) {
        dispatch(addItem(item))
      }

      setAnswered(true)
      setSelectedAnswer(response)
    }
  }

  const answers = [
    { name: 'Yes', value: 'yes', variant: 'outline-success' },
    { name: 'No', value: 'no', variant: 'outline-danger' }
  ]
  return (
        <ListGroup.Item>
            <div>
                <span className="margin-40 padding-sm" style={{ float: 'left' }}>
                    {listType === 'shopping-list' ? item.description : item.name}
                </span>
            </div>
            <ButtonGroup style={{ float: 'right' }}>
                {
                  answers.map((answer, i) => (
                        <Button
                            key={`${listType}-${i}`}
                            variant={answer.variant}
                            name="radio"
                            value={answer.value}
                            active={selectedAnswer === answer.value}
                            onClick={handleListSuggestionAction}
                            disabled={answered && selectedAnswer !== answer.value}
                        >
                            {answer.name}
                        </Button>
                  ))
                }
            </ButtonGroup>
            <ButtonGroup style={{ float: 'right' }}>
               { answered && <Button onClick={handleUndo} variant="warning">Undo</Button> }
            </ButtonGroup>
        </ListGroup.Item>
  )
}

export default SuggestionListItem
