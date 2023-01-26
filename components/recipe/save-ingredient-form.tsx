import React, { useState } from 'react'; 
import  FormGroup  from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import Card  from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Ingredient } from '../types';

type PropTypes = {
    ingredient: Ingredient,
    foodList: string[]
}
const SaveIngredientForm = ({ ingredient, foodList }: PropTypes) => { 

    const [addingToPantry, setAddingToPantry] = useState(false); 
    const [savingExisting, setSavingExisting] = useState(false);

    //  onSubmitIngredientForm: 
    // adding: save new food with ingredient id 
    // save existing: add ingredient to food.ingredients 

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
                    <Form className='food-form'>
                        { 
                            addingToPantry && <FormGroup>
                                <Form.Label for="name">New Food Name (leave out adjectives from the recipe e.g. "diced", "creamy") </Form.Label>
                                <Form.Control type="text" name="name" placeholder="Food Name" />
                                <Form.Label for="quantity">Quantity</Form.Label>
                                <Form.Control type="number" name="quantity" placeholder="Add quantity"/>
                                <Form.Label for="unit">Unit</Form.Label>
                                <Form.Control type="text" name="unit" placeholder="Add unit"/>
                                <Form.Label for="calories">Calories</Form.Label>
                                <Form.Control type="number" name="calories" placeholder="Add calorie count"/>
                            </FormGroup>
                        }

                        {
                            savingExisting && <Form.Control as='select'>
                                <option>Select food from pantry</option>
                                { foodList.map(food => {
                                    console.log('food', food)
                                    return <option value={food}>{food}</option>
                                })}
                            </Form.Control>
                        }
                        <Form.Check checked={ingredient.have} label="Save to my shopping list"/>
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

