import Head from 'next/head';
import styles from './layout.module.css';
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Layout({ children }) {
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
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Meal Planner App"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/mealplanner}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={"meal planner"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <header className={styles.header}>
        
      </header>
      <main>{children}</main>
    </div></>
  );
}