import { useMutation } from '@apollo/client';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import React from 'react'; 
import BackButton from '../../components/back-button';
import FoodForm from '../../components/food/food-form';
import { Food } from '../../components/types';
import { UPDATE_FOOD } from '../../graphql/mutations/food-mutation';
import prisma from '../../lib/prisma';

type PropTypes = {
    food: Food
}

const FoodPage = ({ food }: PropTypes) => {
    const router = useRouter(); 
    
    const [updateFood] = useMutation(UPDATE_FOOD, {
        onError(err) {
            console.error('error creating food', JSON.stringify(err, null, 2))
        },
        onCompleted(){
            router.push('/food/')
        }
    })

    const handleUpdateFood = (food: Food, foodId: number) => {
        updateFood({variables: { foodId, newData: food}})
    }

    return (
        <div>
            <BackButton link='/food'/>
            <h3>Edit {food.name}</h3>
            <FoodForm food={food} onSubmit={handleUpdateFood} onCancel={() => router.push('/food')}/>
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
