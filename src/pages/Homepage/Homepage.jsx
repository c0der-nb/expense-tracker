import React from 'react';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';

function Homepage() {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <Hero />
        </div>
    )
}

export default Homepage;