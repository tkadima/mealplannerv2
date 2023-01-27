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
    foodList: string[],
    onSubmit: (food: Food) => void
 }
const SaveIngredientForm = ({ ingredient, foodList, onSubmit }: PropTypes) => { 

    const [addingToPantry, setAddingToPantry] = useState(false); 
    const [savingExisting, setSavingExisting] = useState(false);

    const { register, handleSubmit } = useForm({

    });

     const handleSubmitFoodForm = (foodObject: object) => {
        if (addingToPantry) {
            const food = {...foodObject, quantity: parseFloat(foodObject['quantity']),
             calories: parseInt(foodObject['calories']) } as Food 
            onSubmit(food);
        }
        else if (savingExisting) {
            // update existing food to include ingredient (connect)
            console.log('Submit!')
        }
     }

    return (<Card className='ingredient-card'>
                <Card.Title>{ingredient.description}</Card.Title>
                <Card.Body>
                    {
                        !addingToPantry && !savingExisting && <ButtonGroup>
                            <Button onClick={() => setAddingToPantry(true)}variant="warning">Add To Pantry</Button>
                            <Button onClick={() => setSavingExisting(true)}>Already in Pantry</Button>
                        </ButtonGroup>
                    }
                    {/* onSubmit */}
                    <Form className='food-form' onSubmit={handleSubmit(handleSubmitFoodForm)}>
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
                            savingExisting && <Form.Control as='select'>
                                <option>Select food from pantry</option>
                                { foodList.map(food => {
                                    return <option key={food} value={food}>{food}</option>
                                })}
                            </Form.Control>
                        }
                        <Form.Check defaultChecked={ingredient.have} label="Save to my shopping list"/>
                        {
                        (addingToPantry || savingExisting) && 
                            <ButtonGroup>
                                <Button variant="secondary" onClick={() => {
                                    setAddingToPantry(false);
                                    setSavingExisting(false);
                                }}>Cancel</Button>
                                <Button type="submit">Save Food</Button>
                            </ButtonGroup>
                        }
                    
                    </Form>
                </Card.Body>
            </Card>);
}

export default SaveIngredientForm;

