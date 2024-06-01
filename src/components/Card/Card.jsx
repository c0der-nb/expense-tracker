import React from 'react';
import styles from "./Card.module.css";

function Card({type, amount, addIncomeHandler, addBalanceHandler}) {
    if (type === "income") {
        return (
            <div className={styles.wrapper}>
                <p>Wallet Balance: <span className={styles.bSpan}>₹4500</span></p>
                <button className={styles.incomeButton} onClick={() => addIncomeHandler(true)}>+ Add Income</button>
            </div>
        )
    }
    if (type === "expense") {
        return (
            <div className={styles.wrapper}>
                <p>Expenses: <span className={styles.eSpan}>₹500</span></p>
                <button className={styles.expenseButton} onClick={() => addBalanceHandler(true)}>+ Add Expense</button>
            </div>
        )
    }
}

export default Card;