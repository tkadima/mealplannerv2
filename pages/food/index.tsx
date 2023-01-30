import { GetServerSideProps } from 'next';
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import prisma from '../../lib/prisma';
import { Food } from '../../components/types';
import Layout from '../../components/layout';

type PropTypes = {
    foods: Food[],
}

const Food = ({foods}: PropTypes) => {
    return (
    <Layout>
        <ListGroup>
        { 
            foods.map(food => {
                return <ListGroupItem key={food.id} >{food.name}</ListGroupItem>
            })
        }
    </ListGroup>
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