import { useState } from 'react';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const ListSuggestion = (props) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [ answered, setAnswered] = useState(false)

    const handleClickButton = (e) => {
        setSelectedAnswer(e.target.value);
        setAnswered(true);
        props.onClick(e.target.value, props.item);
    }

    const handleUndo = (e) => {
        setAnswered(false);
        setSelectedAnswer(null);
    }

    const answers = [
        { name: 'Yes', value: 'yes', variant: 'outline-success'},
        { name: 'No', value: 'no', variant: 'outline-danger'},
        {name: 'Already have it', value: 'already-have', variant: 'outline-primary'}
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
                            onClick={handleClickButton}
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

export default ListSuggestion;