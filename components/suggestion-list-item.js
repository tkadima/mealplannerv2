import { useState } from 'react';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { addItem, removeItem } from '../redux/shopping-list-slice';
import { useDispatch, useSelector } from 'react-redux';

const SuggestionListItem = (props) => {

    const dispatch = useDispatch();
    const { shoppingList } = useSelector(state => state.shoppingList);

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [ answered, setAnswered] = useState(false)
    

    const handleUndo = () => {
        if (selectedAnswer === 'yes')
            dispatch(removeItem(props.item))

        setAnswered(false);
        setSelectedAnswer(null);
    }

    const handleListSuggestionAction = (e) => {
        let response = e.target.value; 
        if (props.type === 'shopping-list') {
            if (response === 'yes' && !shoppingList.includes(props.item)) {
                dispatch(addItem(props.item))
            }

            setAnswered(true);
            setSelectedAnswer(response);
        }
   
    }

    const answers = [
        { name: 'Yes', value: 'yes', variant: 'outline-success'},
        { name: 'No', value: 'no', variant: 'outline-danger'},
   ] 
    return (
        <ListGroup.Item>
            <div>
                <span className="margin-40 padding-sm" style={{float: "left"}}>
                    {props.type === 'shopping-list' ? props.item.description : props.item.name}
                </span>
            </div>
            <ButtonGroup style={{float: "right"}}>
                {
                  answers.map((answer, i) => (
                        <Button 
                            key={`${props.type}-${i}`} 
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
        </ListGroup.Item>
    );
}

export default SuggestionListItem;