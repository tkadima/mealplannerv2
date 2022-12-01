import React, { useEffect, useState } from 'react';
import { Food, Recipe } from './types';
import axios from 'axios';
import { AppProps } from 'next/app';
import '../styles/global.css';

const App = ({Component,  pageProps}: AppProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]); 
	const [food, setFood] = useState<Food[]>([]);

	const getRecipes = () => {
		axios.get('/api/recipes')
			.then(res => {			
				setRecipes(res.data);
			})
			.catch(err => {
				console.error('fetching recipes resulted in error: ', err);
			});
	};

	const getFood = () => {
		axios.get('/api/food')
			.then(res => {
				setFood(res.data);
			})
			.catch(err => {
				console.error('error fetching food', err);
			});
	};

	useEffect(() => {
		getRecipes();
		getFood();
	}, []);

	return (<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes} foodList={food} setFoodList={setFood}/>);
};
export default App;