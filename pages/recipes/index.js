import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/layout';
import data from '../../data.json'
import Link from 'next/link'

const Recipes = () => {
    return (
        <Layout>
            <h3>Recipes</h3>
            <ListGroup>
                { data.recipes.map(r => {
                    return <ListGroup.Item key={r.id}>{r.name}</ListGroup.Item>
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