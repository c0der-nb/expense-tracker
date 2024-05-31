import React from 'react';
import styles from "./HeroSection.module.css";
import Card from "../Card/Card";

function HeroSection() {
    return (
        <div className={styles.wrapper}>
            <Card type='income' />
            <Card type='expense' />
        </div>
    )
}

export default HeroSection;