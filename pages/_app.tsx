import '../styles/global.css';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../types';
import axios from 'axios';
import { AppProps } from 'next/app';


const App = ({Component,  pageProps}: AppProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]); 

	const getRecipes = async() => {
		let convertedRecipes : Recipe[];
		axios.get('/api/recipes')
			.then(res => {
				const dbRecipes = res.data;
				convertedRecipes = dbRecipes.map((r: any) => { 
					return Object.assign(new Recipe, r );
				});
				setRecipes(convertedRecipes);
			})
			.catch(err => {
				console.error('fetching recipes resulted in error: ', err);
			});
	};

	useEffect(() => {
		getRecipes();
	}, []);

	return (<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes}/>);
};
export default App;