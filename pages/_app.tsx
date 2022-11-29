import '../styles/global.css';
import React, { useEffect, useState } from 'react';
import { Food, Recipe } from './types';
import axios from 'axios';
import { AppProps } from 'next/app';


const App = ({Component,  pageProps}: AppProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]); 
	const [food, setFood] = useState<Food[]>([]);

	const getRecipes = () => {
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

	const getFood = () => {
		axios.get('/api/food')
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.error('error fetching food', err);
			});
	};

	useEffect(() => {
		getRecipes();
		getFood();
	}, []);

	return (<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes} foodList={food} setFood={setFood}/>);
};
export default App;