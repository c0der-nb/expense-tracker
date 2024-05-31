import React from 'react';
import styles from "./HeroSection.module.css";
import Card from "../Card/Card";
import PieChart from '../../components/PieChart/PieChart';

function HeroSection() {
    return (
        <div className={styles.wrapper}>
            <Card type='income' />
            <Card type='expense' />
            <PieChart />
        </div>
    )
}

export default HeroSection;