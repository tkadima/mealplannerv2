import React, { useEffect, useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import ScheduleModal from '../../components/schedule/schedule-modal';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';
import { DaysOfWeek, Ingredient, Meal, MealTypes, Recipe } from '../../components/types';
import { CLEAR_MEAL_RECIPES, EDIT_MEAL } from '../../graphql/mutations/meal-mutations';
import { useMutation } from '@apollo/client';
import MealTable from '../../components/schedule/meal-table';
import ModalWrapper from '../../components/modal-wrapper';

type PropTypes = {
	recipes: Recipe[],
	meals: Meal[],
	ingredients: Ingredient[]
}

const Schedule = ({recipes, meals}: PropTypes) => {
	
	const dayKeys = Object.keys(DaysOfWeek);
	const mealKeys = Object.keys(MealTypes); 

	const [showModal, setShowModal] = useState<boolean>(false); 
	const [showDayModal, setShowDayModal] = useState<boolean>(false); 
	const [selectedMeal, setSelectedMeal] = useState<Meal>(null); 
	const [selectedHeaderDay, setSelectedHeaderDay] = useState<string>(null); 
	const [scheduleData, setScheduleData] = useState({});

	const [updateMealRecipes] = useMutation(EDIT_MEAL, {
		onError(err) {
			console.error('error adding recipe to meal', err, JSON.stringify(err, null, 2));
		},
		onCompleted(data){
			const day = dayKeys.find(d => DaysOfWeek[d] === selectedMeal.day);
			const meal = mealKeys.find(m =>  MealTypes[m] === selectedMeal.mealType);

			const updatedSelectedMeal = {...selectedMeal, recipes: data.updateMealRecipes.recipes};
			const updatedData = {...scheduleData, 
				[day]: {
					...scheduleData[day], 
					[meal]: updatedSelectedMeal
				}};
			setScheduleData(updatedData);
		}
	});

	const [clearMealRecipes] = useMutation(CLEAR_MEAL_RECIPES, {
		onError(err) {
			console.error('error clearing recipes', JSON.stringify(err, null, 2));
		},
		onCompleted(){
			const days = Object.keys(scheduleData); 
			let newData = {}; 
			days.forEach(day => {
				const mealsForDay = scheduleData[day];
				const mealTypes = Object.keys(mealsForDay); 
				let newMeals = {};
				mealTypes.forEach(mealType => {
					const mealObj = {...scheduleData[day][mealType], recipes: []}; 
					newMeals = {...newMeals, [mealType]: mealObj};
				}); 
				newData = {...newData, [day]: newMeals};
			});
			setScheduleData(newData); 
		}
	});

	const handleSelectCell = (mealData: Meal) => {
		setSelectedMeal(mealData); 
		setShowModal(true);
	};

	const handleHeaderSelectCell = (selectedDay: string) => {
		setSelectedHeaderDay(selectedDay)
		setShowDayModal(true);
	}

	const handleSaveMeal = (newRecipes: Recipe[], deletedRecipes: Recipe[]) => {
		const newRecipeIds = newRecipes?.map(r => r.id);
		const removeRecipeIds = deletedRecipes?.map(r => r.id);
		updateMealRecipes({variables: { mealId: selectedMeal.id, newRecipeIds, removeRecipeIds }});
	};

	const initializeScheduleData  = () => {
		const scheduleData = {}; 
		dayKeys.forEach(day => {
			const mealsForDay = meals.filter(meal => meal.day === DaysOfWeek[day]); 
			scheduleData[day] = {};
			mealKeys.forEach(meal => {
				const mealForDayandType = mealsForDay.filter(m => MealTypes[meal] === m.mealType)[0]; 
				scheduleData[day][meal] = mealForDayandType; 
			});
		});
		setScheduleData(scheduleData);
	};

	useEffect(() => {
		initializeScheduleData();		
	}, []);

	return (
		<>
			<h3>Schedule</h3>
			<Button variant="primary" className="reset-button" onClick={() => clearMealRecipes()}>Reset Schedule</Button>
			<ScheduleModal 
				show={showModal} 
				onCloseModal={() => setShowModal(false)} 
				mealData={selectedMeal ?? null} 
				recipes={recipes}
				onSaveMeal={handleSaveMeal}
			/>
			<ModalWrapper show={showDayModal} title={selectedHeaderDay} onHide={() => setShowDayModal(false)}>
				Hello - testing wrapper
			</ModalWrapper>
			<MealTable scheduleData={scheduleData} 
				onSelectCell={handleSelectCell} 
			    onSelectHeaderCell={handleHeaderSelectCell}
			/>
		</>
	);
};

export default Schedule;


export const getServerSideProps: GetServerSideProps = async () => {
	const unparsedRecipes = await prisma.recipe.findMany({include: { ingredients: true }});
	const recipes = unparsedRecipes.map((r: prisma.recipe) => ({
		...r, 
		ingredients: r.ingredients.map((i: prisma.ingredient) => ({
			...i,
			quantity: i.quantity?.toNumber() ?? null, 
			quantity2: i.quantity?.toNumber() ?? null
		}))
	}));

	const meals = await prisma.meal.findMany({include: { recipes: true }});
	return {
		props: {
			recipes,
			meals,
		}
	};
};