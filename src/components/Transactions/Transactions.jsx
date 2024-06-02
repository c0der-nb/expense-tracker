import React, { useState, useEffect } from "react";
import styles from "./Transactions.module.css";
import { ReactComponent as FoodIcon } from "../../assets/samosa.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as EntertainmentIcon } from "../../assets/movie-icon.svg";
import { ReactComponent as TravelIcon } from "../../assets/auto-icon.svg";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";

function Transactions({expenses, editModalStateHandler, deleteExpenseHandler}) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);
    const [pageCount, setPageCount] = useState(1);

    const nextHandler = () => {
        if (endIndex < expenses.length) {
            setStartIndex(endIndex);
            setEndIndex((prevVal) => prevVal+3);
            setPageCount((prevVal) => prevVal+1)
        }
    }

    const previousHandler = () => {
        if (startIndex > 0) {
            setEndIndex(startIndex);
            setStartIndex((prevVal) => prevVal-3);
            setPageCount((prevVal) => prevVal-1);
        }
    }

    useEffect(() => {
        setStartIndex(0);
        setEndIndex(3);
    }, [])

    return (
        <div className={styles.wrapper}>
            <div>
            {
                expenses.slice(startIndex, endIndex).map((expense) => (
                <div key={expense.id}>
                    <div className={styles.lineItem}>
                        <div className={styles.item}>
                            {expense.category === "Entertainment" && <EntertainmentIcon />}
                            {expense.category === "Travel" && <TravelIcon />}
                            {expense.category === "Food" && <FoodIcon />}
                            <div className={styles.itemDetail}>
                                <p>{expense.title}</p>
                                <p>{new Date(expense.date).toDateString()}</p>
                            </div>
                        </div>
                        <div className={styles.priceButtons}>
                            <p>{`₹${expense.price}`}</p>
                            <div className={styles.icons}>
                                <DeleteIcon onClick={() => deleteExpenseHandler(expense.id)} className="cursor-pointer" />
                                <EditIcon onClick={() => editModalStateHandler(expense, true)} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                ))
            }
            </div>
            <div className={styles.pagination}>
                <button onClick={previousHandler} className={`${styles.arrow} cursor-pointer`}><LeftArrow /></button>
                <div className={styles.indexing}>{pageCount}</div>
                <button onClick={nextHandler} className={`${styles.arrow} cursor-pointer`}><RightArrow /></button>
            </div>
        </div>
    )
}

export default Transactions;