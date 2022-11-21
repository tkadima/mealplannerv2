import '../styles/global.css';
import React, { useEffect, useState } from 'react';
import data from './api/data.json'
import { Recipe } from '../types';

const App = ({ Component,  pageProps}) => {
    const [recipes, setRecipes] = useState([]); 

    const getRecipes = () => {
        let dbRecipes = data.recipes;
        let convertedRecipes = dbRecipes.map(r => { return Object.assign(new Recipe, r )})

        setRecipes(convertedRecipes);
    }

    useEffect(() => {
        getRecipes();
    }, [])


    return (<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes}/>);
}
export default App;