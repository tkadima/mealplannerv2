import { BsFillTrashFill } from 'react-icons/bs'
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

const RecipeListItem = (props) => {
    const handleDeleteRecipe = () => {
        props.onDelete(props.name);
    }
    return (
        <ListGroup.Item>
            <Link href={`/recipes/${props.id}`}>{props.name}</Link>
        <div style={{float: "right"}}>
            <span style={{margin: "20px"}}>
                <BsFillTrashFill onClick={handleDeleteRecipe}></BsFillTrashFill>
            </span>
        </div>
        </ListGroup.Item>
    );
}

export default RecipeListItem;