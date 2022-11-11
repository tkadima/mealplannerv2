import { useState } from 'react';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { addItem, removeItem } from '../redux/shopping-list-slice';
import { useDispatch, useSelector } from 'react-redux';
// import { addFood } from '../../redux/fridge-slice'

const SuggestionListItem = (props) => {

    const dispatch = useDispatch();
    const { shoppingList } = useSelector(state => state.shoppingList);

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [ answered, setAnswered] = useState(false)
    

    const handleUndo = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        dispatch(removeItem(props.item))
    }

    const handleListSuggestionAction = (e) => {
        let response = e.target.value; 
        if (response === "yes" && !shoppingList.includes(props.item)) {
            dispatch(addItem(props.item))
        }
        setAnswered(true);
        setSelectedAnswer(response);
        setAnswered(true);
    }

    const answers = [
        { name: 'Yes', value: 'yes', variant: 'outline-success'},
        { name: 'No', value: 'no', variant: 'outline-danger'},
        {name: 'Already in shopping list', value: 'already-have', variant: 'outline-primary'}
   ]

    return (
        <ListGroup.Item>
            <div>
                <span className="margin-40 padding-sm" style={{float: "left"}}>{props.item}</span>
            </div>
            <ButtonGroup style={{float: "right"}}>
                {
                  answers.map((answer, i) => (
                        <Button 
                            key={i} 
                            type="radio"
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
            <ButtonGroup style={{float: "right"}}>
               { answered && <Button onClick={handleUndo} variant="warning">Undo</Button> }
            </ButtonGroup>
            {
                selectedAnswer === 'already-have' &&
                <div>
                    <h5>Would you like to add {props.item} to fridge?</h5>
                    <ButtonGroup>
                        <Button type="radio">Yes</Button>
                        <Button type="radio">No</Button>
                        <Button type="radio">Already in fridge</Button>
                    </ButtonGroup>
                </div>
            }
        </ListGroup.Item>
    );
}

export default SuggestionListItem;