import React from 'react';
import styles from "./Card.module.css";

function Card({type, totalExpenses, addBalanceHandler, addIncomeHandler}) {
    if (type === "income") {
        return (
            <div className={styles.wrapper}>
                <p>Wallet Balance: <span className={styles.bSpan}>{`₹${localStorage.getItem("WALLET_BALANCE")}`}</span></p>
                <button className={styles.incomeButton} onClick={() => addBalanceHandler(true)}>+ Add Income</button>
            </div>
        )
    }
    if (type === "expense") {
        return (
            <div className={styles.wrapper}>
                <p>Expenses: <span className={styles.eSpan}>{`₹${totalExpenses}`}</span></p>
                <button className={styles.expenseButton} onClick={() => addIncomeHandler(true)}>+ Add Expense</button>
            </div>
        )
    }
}

export default Card;