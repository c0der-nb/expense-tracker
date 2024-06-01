import React from 'react';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';

function Homepage() {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <Hero />
            <div className={styles.main}>
                <div className={styles.transactions}>
                    <h4>Recent Transactions</h4>
                    <Transactions />
                </div>
                <div className={styles.topExpenses}>
                    <h4>Top Expenses</h4>
                </div>
            </div>
        </div>
    )
}

export default Homepage;