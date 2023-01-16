import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '..';


describe('Home page is displayed', () => {
	it('Should display homepage', () => {
		render(<Home/>);

		expect(screen.getByRole('heading', { name: 'Welcome to Meal Planner'} )).toBeInTheDocument();
	});

});