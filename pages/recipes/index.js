import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/layout';
import data from '../../data.json'


const Recipes = () => {
    return (
        <Layout>
            <h1>Recipes</h1>
            <ListGroup>
                { data.recipes.map(r => {
                    return <ListGroup.Item key={r.id}>{r.name}</ListGroup.Item>
                })
                }
            </ListGroup>
            <div className="col text-center padding-md">
                <Button>Add New</Button>
            </div>
        </Layout>

    );
}

export default Recipes;