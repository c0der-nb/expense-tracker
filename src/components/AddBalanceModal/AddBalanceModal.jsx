import React from "react";
import ReactModal from "react-modal";
import styles from "./AddBalanceModal.module.css";

function AddBalanceModal({cancelHandler}) {
    return (
        <div>
            <ReactModal 
                isOpen
                contentLabel="Add Balance Modal"
                overlayClassName={styles.overlay}
                className={styles.modal}
            >
                <p className={styles.modalHeading}>Add Balance</p>
                <div className={styles.balanceFormContainer}>
                    <input className={styles.balanceInput} type="text" placeholder="Income Amount" />
                    <button className={`${styles.addButton} cursor-pointer`}>Add Balance</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </ReactModal>
        </div>
    )
}

export default AddBalanceModal;