import React from "react";
import styles from "./TopExpenses.module.css";

const DATA = [{category: 'Entertainment', expense: '500'}, {category: 'Food', expense: '250'}, {category: 'Travel', expense: '150'}];

function TopExpenses({data}) {
    const topExpense = DATA[0].expense;
    return (
        <div className={styles.wrapper}>
            {DATA.map((val) => (
                <div className={styles.expense}>
                    <div className={styles.expenseTitle}>{val.category}</div>
                    <div className={styles.barContainer}>
                        <div style={{width: `${(val.expense/topExpense)*100}%`}} className={styles.expenseBar}></div>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default TopExpenses;