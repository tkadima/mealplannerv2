import Head from 'next/head';
import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type PropTypes ={
  children: ReactNode;
}
export default function Layout({ children }: PropTypes) {
	return (
		<>
			<Navbar bg="success" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Meal Planner</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/recipes">Recipes</Nav.Link>
						<Nav.Link href="/schedule">Schedule</Nav.Link>
						<Nav.Link href="/food">Fridge</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<div>
				<Head>
					<title>Meal Planner</title>
					<meta
						name="description"
						content="Meal Planner App"
					/>
				</Head>
      
				<header className={styles.header}>
        
				</header>
				<main className={styles.container}>{children}</main>
			</div></>
	);
}