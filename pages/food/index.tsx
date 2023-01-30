import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import prisma from '../../lib/prisma';
import { Food } from '../../components/types';
import Layout from '../../components/layout';
import { BsFillTrashFill } from 'react-icons/bs';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { DELETE_FOOD } from '../../graphql/mutations/food-mutation';

type PropTypes = {
    foods: Food[],
}

const Food = ({foods}: PropTypes) => {
    const [foodList, setFoodList] = useState([]); 

    const [deleteFood] = useMutation(DELETE_FOOD, {
        onError(err) {
            console.error('error deleting food', JSON.stringify(err, null, 2))
        },
        onCompleted(data) {
            const foodId = data.deleteFood.id; 
            const newFoodList = foodList.filter(food => food.id !== foodId)
            setFoodList(newFoodList);
        }
    });

    useEffect(() => {
        setFoodList(foods);
    }, [])
    
    return (
    <Layout>
        <h3>Pantry</h3>
        <ListGroup>
        { 
            foodList.length > 0 &&
            foodList.map(food => {
                return <ListGroupItem key={food.id} >
                    <Link href={''}>{food.name}</Link>
                    <div className="float-right">
				        <BsFillTrashFill onClick={() => deleteFood({variables: {deleteFoodId: food.id}})}></BsFillTrashFill>
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
    const unparsedFoods = await prisma.food.findMany({});
    const foods = unparsedFoods.map((food: prisma.food) => ({...food, 
        quantity: food.quantity?.toNumber() ?? null, 
    }));
    return {
        props: {
            foods
        }
    }
}