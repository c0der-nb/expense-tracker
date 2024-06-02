import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./AddBalanceModal.module.css";

function AddBalanceModal({cancelHandler}) {
    const [balanceInput, setBalanceInput] = useState("");
    const addBalanceHandler = () => {
        if (!balanceInput)
            alert("Please enter valid amount")
        else {
            localStorage.setItem("WALLET_BALANCE", balanceInput);
            cancelHandler();
        }
    }

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
                    <input className={styles.balanceInput} type="number" placeholder="Income Amount" onChange={(e) => setBalanceInput(e.target.value)} />
                    <button className={`${styles.addButton} cursor-pointer`} onClick={addBalanceHandler}>Add Balance</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </ReactModal>
        </div>
    )
}

export default AddBalanceModal;