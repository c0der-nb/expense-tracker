import React from 'react';
import styles from "./HeroSection.module.css";
import Card from "../Card/Card";
import PieChart from '../../components/PieChart/PieChart';

function HeroSection({expenses, addModalStateHandler, balanceModalStateHandler, totalExpenses}) {
    return (
        <div className={styles.wrapper}>
            <Card type='income' addBalanceHandler={balanceModalStateHandler}/>
            <Card type='expense'  totalExpenses={totalExpenses} addIncomeHandler={addModalStateHandler} />
            <PieChart data={expenses} />
        </div>
    )
}

export default HeroSection;