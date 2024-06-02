import React from 'react';
import styles from "./HeroSection.module.css";
import Card from "../Card/Card";
import PieChart from '../../components/PieChart/PieChart';

function HeroSection({addModalStateHandler, balanceModalStateHandler}) {
    return (
        <div className={styles.wrapper}>
            <Card type='income' addBalanceHandler={balanceModalStateHandler}/>
            <Card type='expense' addIncomeHandler={addModalStateHandler} />
            <PieChart />
        </div>
    )
}

export default HeroSection;