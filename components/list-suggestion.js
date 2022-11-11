import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const ListSuggestion = (props) => {

    const handleClickButton = (e) => {
        props.onClick(e.target.value, props.item);
    }

    return (
        <ListGroup.Item>
            <div>
                <span className="margin-40 padding-sm" style={{float: "left"}}>{props.item}</span>
            </div>
            <div style={{float: "right"}}>
                <Button onClick={handleClickButton} variant="success" value="yes">Yes</Button>
                <Button onClick={handleClickButton} variant="warning" value="no">No</Button>
                <Button onClick={handleClickButton} variant="primary" value="already-have">Already have it</Button>
            </div>
        </ListGroup.Item>
    );
}

export default ListSuggestion;