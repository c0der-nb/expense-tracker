import React from "react";
import styles from "./DeleteExpenseConfirmModal.module.css";

function DeleteExpenseConfirmModal({id, deleteExpenseHandler, cancelHandler}) {

    return (
        <div className={styles.overlay}>
            <div
                className={styles.modal}
            >
                <p className={styles.modalHeading}>You sure?</p>
                <div className={styles.container}>
                    <button className={`${styles.addButton} cursor-pointer`} onClick={() => deleteExpenseHandler(id)}>Yes</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteExpenseConfirmModal;