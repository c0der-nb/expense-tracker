import React from "react";
import styles from "./TopExpenses.module.css";
import { CATEGORY_LIST } from "../../constants/categories";

function TopExpenses({data}) {
    let categorisedDataList = [];
    const categoryToListMap = new Map();
    CATEGORY_LIST.forEach((category) => {
      categoryToListMap.set(category, data.filter((val) => val.category === category));
    });
    categoryToListMap.forEach((value, key) => {
      categorisedDataList.push({
        category: key,
        value: value.reduce((acc, cv) => acc + parseInt(cv.price),0)
      })
    })
    categorisedDataList.sort((a, b) => b.value - a.value);
    const topExpense = categorisedDataList[0]?.value;
    return (
        <div className={styles.wrapper}>
            {data.length > 0 ? categorisedDataList.map((val) => (
                <div className={styles.expense} key={val.category}>
                    <div className={styles.expenseTitle}>{val.category}</div>
                    <div className={styles.barContainer}>
                        <div style={{width: `${(val.value/topExpense)*100}%`}} className={styles.expenseBar}></div>
                    </div>
                </div>))
            : <p>Start adding expense to see insights.</p>}
        </div>
    )
}

export default TopExpenses;