import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import BackButton from '../../components/back-button';
import FoodForm from '../../components/food/food-form';
import { Food } from '../../components/types';
import { ADD_FOOD } from '../../graphql/mutations/food-mutation';

const NewFood = () => {
    const router = useRouter(); 
    
    const [createFood] = useMutation(ADD_FOOD, {
        onError(err) {
            console.error('error creating food', JSON.stringify(err, null, 2))
        },
        onCompleted(){
            router.push('/food')
        }
    })
    const handleAddFood = (food: Food) => {
        createFood({variables: {newData: food}})
    }
    return (<>
        <BackButton link='/food'/>
        <h3>Create New Food</h3>
        <FoodForm onCancel={() => router.push('/food')} onSubmit={handleAddFood}/>
    </>)
}

export default NewFood; 