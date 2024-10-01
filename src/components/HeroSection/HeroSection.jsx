import React from 'react';
import styles from "./HeroSection.module.css";
import Card from "../Card/Card";
import PieChart from '../../components/PieChart/PieChart';

function HeroSection({expenses, addModalStateHandler, balanceModalStateHandler, totalExpenses, walletBalance, isWalletLoading, isExpenseLoading}) {
    return (
        <div className={styles.wrapper}>
            <Card type='income' addBalanceHandler={balanceModalStateHandler} walletBalance={walletBalance} isWalletLoading={isWalletLoading}/>
            <Card type='expense' totalExpenses={totalExpenses} addIncomeHandler={addModalStateHandler} isExpenseLoading={isExpenseLoading} />
            {expenses.length > 0 ? <PieChart data={expenses} /> : <p>Start adding expense to see insights.</p>}
        </div>
    )
}

export default HeroSection;