import React, {useState} from "react";
import styles from "./ExpenseModal.module.css";
import ReactModal from "react-modal";

function ExpenseModal({type, cancelHandler}) {
    return (
        <div>
            <ReactModal 
                isOpen
                contentLabel="Add Edit Expense Modal"
                overlayClassName={styles.overlay}
                className={styles.modal}
            >
            <p className={styles.modalHeading}>{type === 'add' ? 'Add Expenses' : "Edit Expenses"}</p>
            <div className={styles.expenseFormContainer}>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Price" />
                <input type="text" placeholder="Select Category" />
                <input type="date" placeholder="dd/mm/yyyy" />
                <button className={`${styles.addButton} cursor-pointer`}>{type === 'add' ? 'Add Expense' : 'Update Expense'}</button>
                <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
            </div>
            </ReactModal>
        </div>
    )
}

export default ExpenseModal