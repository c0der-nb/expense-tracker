import React from "react";
import styles from "./TopExpenses.module.css";

function TopExpenses({data}) {
    let categorisedDataList = [];
    let entertainmentList = data.filter((val) => val.category === "Entertainment");
    let foodList = data.filter((val) => val.category === "Food");
    let travelList = data.filter((val) => val.category === "Travel");
    categorisedDataList.push(
      {
        category: "Entertainment",
        value: entertainmentList.reduce((acc, cv) => acc + parseInt(cv.price),0)
      },
      {
        category: "Food",
        value: foodList.reduce((acc, cv) => acc + parseInt(cv.price),0)
      },
      {
        category: "Travel",
        value: travelList.reduce((acc, cv) => acc + parseInt(cv.price),0)
      }
    )
    categorisedDataList.sort((a, b) => b.value - a.value);
    const topExpense = categorisedDataList[0].value;
    return (
        <div className={styles.wrapper}>
            {categorisedDataList.map((val) => (
                <div className={styles.expense} key={val.category}>
                    <div className={styles.expenseTitle}>{val.category}</div>
                    <div className={styles.barContainer}>
                        <div style={{width: `${(val.value/topExpense)*100}%`}} className={styles.expenseBar}></div>
                    </div>
                </div>))
            }
        </div>
    )
}

export default TopExpenses;