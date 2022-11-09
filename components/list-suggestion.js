import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const ListSuggestion = (props) => {

    const handleClickButton = (e) => {
        props.onClick(e.target.value);
    }

    return (
        <ListGroup.Item>
            <span className="margin-40 padding-sm">{props.item}</span>
            <ButtonGroup className="margin-left-40">
                <Button onClick={handleClickButton} variant="outline-success" value="yes">Yes</Button>
                <Button onClick={handleClickButton} variant="outline-warning" value="no">No</Button>
                <Button onClick={handleClickButton} variant="outline-primary" value="already-have">Already have it</Button>
            </ButtonGroup>
        </ListGroup.Item>
    );
}

export default ListSuggestion;