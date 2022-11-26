import '../styles/global.css';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../types';
import axios from 'axios';

const App = ({ Component,  pageProps}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]); 

    const getRecipes = async() => {
        let convertedRecipes : Recipe[];
         axios.get('/api/recipes')
            .then(res => {
                let dbRecipes = res.data;
                convertedRecipes = dbRecipes.map((r: any) => { 
                    return Object.assign(new Recipe, r )
                })
                setRecipes(convertedRecipes);
            })
            .catch(err => {
                console.error('fetching recipes resulted in error: ', err)
            })
    }

    useEffect(() => {
        getRecipes();
    }, [])


    return (<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes}/>);
}
export default App;