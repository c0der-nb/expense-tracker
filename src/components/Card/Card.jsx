import React from 'react';
import styles from "./Card.module.css";
import { CircularProgress } from '@mui/material';

function Card({type, totalExpenses, addBalanceHandler, addIncomeHandler, walletBalance, isWalletLoading, isExpenseLoading}) {
    if (type === "income") {
        return (
            <div className={styles.wrapper}>
                {!isWalletLoading ? <>
                <p>Wallet Balance: <span className={styles.bSpan}>{`₹${walletBalance}`}</span></p>
                <button className={styles.incomeButton} onClick={() => addBalanceHandler(true)}>+ Add Income</button>
                </>
                : <CircularProgress sx={{ color: '#89E148' }} />
                }
            </div>
        )
    }
    if (type === "expense") {
        return (
            <div className={styles.wrapper}>
                {!isExpenseLoading ? <>
                <p>Expenses: <span className={styles.eSpan}>{`₹${totalExpenses}`}</span></p>
                <button className={styles.expenseButton} onClick={() => addIncomeHandler(true)}>+ Add Expense</button>
                </>
                : <CircularProgress sx={{ color: '#FF4747' }} />
                }
            </div>
        )
    }
}

export default Card;