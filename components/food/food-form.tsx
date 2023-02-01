import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Food } from '../types';
import Button from 'react-bootstrap/Button';

type PropTypes = {
    onSubmit: (food: Food) => void; 
    food: Food
}
const FoodForm = ({  onSubmit, food }: PropTypes) => {
    const { register, handleSubmit } = useForm(
        {
            defaultValues: { 
                name: food?.name || '', 
                quantity: food?.quantity || '', 
                unitOfMeasure: food?.unitOfMeasure || '', 
                calories: food?.calories || '',
                have: food?.have || false
            }
        }
    );

    const handleSubmitForm = (formObject: object) => {
        const updatedFood = {...formObject,
            quantity: parseFloat(formObject['quantity']),
            calories: parseInt(formObject['calories']) } as Food 

        onSubmit(updatedFood);
    }
    return (<>
        <Form className='food-form' onSubmit={handleSubmit(handleSubmitForm)}>
            <FormGroup>
                <Form.Label htmlFor="name">
                    New Food Name (leave out adjectives from the recipe e.g. "diced", "creamy") 
                </Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    placeholder="Food Name" 
                    {...register('name', { 
                        required: {
                            value: true, 
                            message: 'Food name cannot be empty'
                        } 
                    })}
                />
                 <Form.Label htmlFor="quantity">Quantity</Form.Label>
                <Form.Control as="input" name="quantity" placeholder="Add quantity" {...register('quantity')}/>
                {/* Consider using select instead, use convert-units */}
                <Form.Label htmlFor="unit">Unit</Form.Label>
                <Form.Control type="text" name="unit" placeholder="Add unit" {...register('unitOfMeasure')}/>
                <Form.Label htmlFor="calories">Calories</Form.Label>
                <Form.Control type="number" name="calories" placeholder="Add calorie count" {...register('calories')}/>
                <Form.Check {...register('have')} 
                                label="I have currently this ingredient"
                            />
                <Button type="submit">Save Food</Button>
            </FormGroup>
        </Form>

    </>)
}

export default FoodForm;