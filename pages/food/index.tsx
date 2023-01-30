import { GetServerSideProps } from 'next';
import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import prisma from '../../lib/prisma';
import { Food } from '../../components/types';
import Layout from '../../components/layout';
import { BsFillTrashFill } from 'react-icons/bs';
import Link from 'next/link';

type PropTypes = {
    foods: Food[],
}

const Food = ({foods}: PropTypes) => {
    return (
    <Layout>
        <ListGroup>
        { 
            foods.map(food => {
                return <ListGroupItem key={food.id} >
                    <Link href={''}>{food.name}</Link>
                    <div className="float-right">
				        <BsFillTrashFill onClick={() => console.log('clicky')}></BsFillTrashFill>
			        </div>
                </ListGroupItem>
            })
        }
        </ListGroup>
        <Button>Add New</Button>
    </Layout>);
}

export default Food; 

export const getServerSideProps: GetServerSideProps = async () => {
    const unparsedFoods = await prisma.food.findMany({})
    const foods = unparsedFoods.map((food: prisma.food) => ({...food, 
        quantity: food.quantity?.toNumber() ?? null, 
    }));
    return {
        props: {
            foods
        }
    }
}