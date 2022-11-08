import { useState } from "react";
import Layout from "../components/layout";
import createShoppingList from "../helpers/shopping-list";
import data from '../data.json'

const ShoppingList = () => {
    const [recipe, setRecipe] = useState(''); 
    const [shoppingList, setShoppingList] = useState([]);
    
    const handleChangeRecipe = (event) => {
        setRecipe(event.target.value);
    }

    const handleSubmitRecipe = () => {
        let list = [...shoppingList, createShoppingList(recipe, data.fridge)].flat();
        setShoppingList(list);
    }

    return(<Layout>
        <div>
            <h1>Generate Shopping List</h1>
            <textarea 
                placeholder="Enter recipe" 
                name="recipe"  
                cols="50"  
                rows="25"
                onChange={handleChangeRecipe}
            />
            <button onClick={handleSubmitRecipe}>Submit Recipe</button>
            <ul>
                {
                    shoppingList.map(s => <li>{s}</li>)
                }
            </ul>
        </div>
    </Layout>)
}

export default ShoppingList;