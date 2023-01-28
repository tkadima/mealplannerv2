import React, { useState } from 'react'; 
import  FormGroup  from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import Card  from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Food, Ingredient } from '../types';
import { useForm } from 'react-hook-form';

type PropTypes = {
    ingredient: Ingredient,
    foodList: Food[],
    onSubmitFood: (food: Food, ingredientId: number) => void
    onSaveIngredientToFood: (foodId: number, ingredientId: number) => void
    completed: boolean
 }

const IngredientCard = ({ ingredient, foodList, onSubmitFood, onSaveIngredientToFood, completed }: PropTypes) => { 
   
    const [addingToPantry, setAddingToPantry] = useState(false); 
    const [savingExisting, setSavingExisting] = useState(false);

    const { register, handleSubmit } = useForm({});

     const handleSubmitForm = (formObject: object) => {
        if (addingToPantry) {
            const food = {...formObject, quantity: parseFloat(formObject['quantity']),
            calories: parseInt(formObject['calories']) } as Food 
            onSubmitFood(food, ingredient.id);
        }
        else if(savingExisting) {
            onSaveIngredientToFood( ingredient.id, parseInt(formObject['foodId']),);
        }
     }

    return (<Card className='ingredient-card'>
                <Card.Title>{ingredient.description}</Card.Title>
                <Card.Body>
                    {
                        !addingToPantry && !savingExisting && !completed && <ButtonGroup>
                            <Button  onClick={() => setAddingToPantry(true)} variant="warning">Add To Pantry</Button>
                            <Button  onClick={() => setSavingExisting(true)}>Already in Pantry</Button>
                        </ButtonGroup>
                    }
                    <Form className='food-form' onSubmit={handleSubmit(handleSubmitForm)}>
                        { 
                            addingToPantry && <FormGroup>
                                <Form.Label htmlFor="name">New Food Name (leave out adjectives from the recipe e.g. "diced", "creamy") </Form.Label>
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
                                <Form.Control type="number" name="quantity" placeholder="Add quantity" {...register('quantity')}/>
                                {/* Consider using select instead */}
                                <Form.Label htmlFor="unit">Unit</Form.Label>
                                <Form.Control type="text" name="unit" placeholder="Add unit" {...register('unitOfMeasure')}/>
                                <Form.Label htmlFor="calories">Calories</Form.Label>
                                <Form.Control type="number" name="calories" placeholder="Add calorie count" {...register('calories')}/>
                            </FormGroup>
                        }

                        {
                            savingExisting && !completed && <Form.Control as='select' {...register('foodId')}>
                                <option>Select food from pantry</option>
                                { foodList.map(food => {
                                    return <option key={food.id} value={food.id}>{food.name}</option>
                                })}
                            </Form.Control>
                        }
                        {
                            savingExisting || addingToPantry &&
                            <Form.Check {...register('have')} 
                                defaultChecked={ingredient.have} 
                                label="I have currently this ingredient"
                            />
                        }
                        {
                        (addingToPantry || savingExisting) && !completed &&
                            <ButtonGroup>
                                <Button variant="secondary" onClick={() => {
                                    setAddingToPantry(false);
                                    setSavingExisting(false);
                                }}>Cancel</Button>
                                <Button type="submit">Save Food</Button>
                            </ButtonGroup>
                        }
                    
                    </Form>
                    {
                        // TODO implement reset
                        completed &&
                        <Button style={{ float: 'right'}}>Reset</Button>
                    }

                </Card.Body>
            </Card>);
}

export default IngredientCard;

