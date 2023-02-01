import { GetStaticPaths } from 'next';
import React from 'react'; 
import BackButton from '../../components/back-button';
import FoodForm from '../../components/food/food-form';
import { Food } from '../../components/types';
import prisma from '../../lib/prisma';

type PropTypes = {
    food: Food
}

const handleUpdateFood = () => {
    console.log('updated')
}

const FoodPage = ({ food }: PropTypes) => {
    return (
        <div>
            <BackButton link='/food'/>
            <h1>Edit {food.name}</h1>
            <FoodForm food={food} onSubmit={handleUpdateFood}/>
        </div>
    )
}

export default FoodPage; 

export const getStaticPaths: GetStaticPaths = async() => {
    const foods = await prisma.food.findMany();
    const paths = foods.map((food: {id: number}) => ({params: {id: food.id.toString()}}));
    return {
        paths, 
        fallback: false
    }
}

export const getStaticProps = async({params}) => {
    const prismaFood = await prisma.food.findUnique({
		where: {id: parseInt(params.id)},
    });

    const food = JSON.parse(JSON.stringify(prismaFood));
    return {
        props: { 
            food
        }
    }
}
