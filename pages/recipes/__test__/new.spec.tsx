import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent } from '@testing-library/react';
import NewRecipe from '../new';


// new page display 
describe('New recipe page', () => {
    render(<MockedProvider>
        <NewRecipe />
    </MockedProvider>)

    // add name input
    const nameInput = screen.getByPlaceholderText('Enter recipe title');
    const ingredientsInput = screen.getByPlaceholderText('Enter ingredients, one ingredient per line');
    const instructionsInput = screen.getByPlaceholderText('Enter cooking instructions as a list. e.g. 1. Chop onions');
    const prepTimeInput = screen.getByPlaceholderText('Add prep time (minutes)'); 
    const cookTimeInput = screen.getByPlaceholderText('Add cook time (minutes)');
    const serveInput = screen.getByPlaceholderText('Number of servings'); 
    const requiresOvenInput = screen.getAllByRole('checkbox')[0];
    const requiresStovetopInput = screen.getAllByRole('checkbox')[1];

    const submitButton = screen.getByRole('button', { name: 'Submit'}); 

    it ('Should display recipe page', () => {
        
        expect(screen.getByRole('heading', { name: 'Create New Recipe'})).toBeInTheDocument(); 

        // inputs 
        expect(nameInput).toBeInTheDocument();
        expect(ingredientsInput).toBeInTheDocument(); 
        expect(instructionsInput).toBeInTheDocument(); 
        expect(prepTimeInput).toBeInTheDocument(); 
        expect(cookTimeInput).toBeInTheDocument(); 
        expect(serveInput).toBeInTheDocument(); 
        expect(requiresOvenInput).toBeInTheDocument();
        expect(requiresStovetopInput).toBeInTheDocument();

        // buttons 
        expect(screen.getByRole('button', { name: 'Submit'})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: ''})).toBeInTheDocument();
        expect(screen.getByRole('link', { name: ''})).toHaveAttribute('href', '/recipes')


    })

    it('Should show error when name is not blank on submit', async() => {

        render(<MockedProvider>
            <NewRecipe />
        </MockedProvider>)
    
        // add name input
        const nameInput = screen.getByPlaceholderText('Enter recipe title');
        const ingredientsInput = screen.getByPlaceholderText('Enter ingredients, one ingredient per line');
        const instructionsInput = screen.getByPlaceholderText('Enter cooking instructions as a list. e.g. 1. Chop onions');
        const prepTimeInput = screen.getByPlaceholderText('Add prep time (minutes)'); 
        const cookTimeInput = screen.getByPlaceholderText('Add cook time (minutes)');
        const serveInput = screen.getByPlaceholderText('Number of servings'); 
        const requiresOvenInput = screen.getAllByRole('checkbox')[0];
        const requiresStovetopInput = screen.getAllByRole('checkbox')[1];

        fireEvent.change(ingredientsInput, { target: { value: '1 cup milk\n 0.5 cups oats\n 2 tbsp syrup' }});  
        fireEvent.change(instructionsInput, { target: { value: 'Follow instructions on package' }});  
        fireEvent.change(prepTimeInput, { target: { value: '5' }});  
        fireEvent.change(cookTimeInput, { target: { value: '10' }});  
        fireEvent.change(serveInput, { target: { value: '2' }});  
        fireEvent.change(requiresOvenInput, { target: { value: false }});  
        fireEvent.change(requiresStovetopInput, { target: { value: true }});  

       expect(screen.getByPlaceholderText('Enter recipe title')).toBeInTheDocument(); 

        fireEvent.click(submitButton);     

        // TODO: expect(await screen.findByText('Recipe title cannot be empty')).toBeInTheDocument();
    })
})

