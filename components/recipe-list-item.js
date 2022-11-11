import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import ListGroup from 'react-bootstrap/ListGroup';

const RecipeListItem = (props) => {
    const handleDeleteRecipe = () => {
        props.onDelete(props.name);
    }
    return (
        <ListGroup.Item>{props.name}
        <div style={{float: "right"}}>
            <span style={{margin: "20px"}}>
                <BsFillPencilFill></BsFillPencilFill>
            </span>
            <span style={{margin: "20px"}}>
                <BsFillTrashFill onClick={handleDeleteRecipe}></BsFillTrashFill>
            </span>
        </div>
        </ListGroup.Item>
    );
}

export default RecipeListItem;