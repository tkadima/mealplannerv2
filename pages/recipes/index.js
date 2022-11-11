import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/layout';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'


const Recipes = () => {
    const { recipes } = useSelector(state => state.recipes);

    return (
        <Layout>
            <h3>Recipes</h3>
            <ListGroup>
                { recipes.map(r => {
                    return <ListGroup.Item key={r.id}>{r.name}
                    <div style={{float: "right"}}>
                        <span style={{margin: "20px"}}>
                            <BsFillPencilFill></BsFillPencilFill>
                        </span>
                        <span style={{margin: "20px"}}>
                            <BsFillTrashFill></BsFillTrashFill>
                        </span>
                    </div>
                    </ListGroup.Item>
                })
                }
            </ListGroup>
            <div className="col text-center padding-md">
                <Link href="/recipes/new">
                    <Button>Add New</Button>
                </Link>
            </div>
        </Layout>

    );
}

export default Recipes;