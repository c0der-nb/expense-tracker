import React, { useState } from "react";
import styles from "./AddBalanceModal.module.css";

function AddBalanceModal({cancelHandler}) {
    const [balanceInput, setBalanceInput] = useState("");
    const CURRENT_BALANCE = localStorage.getItem("WALLET_BALANCE");
    const addBalanceHandler = () => {
        if (!balanceInput)
            alert("Please enter valid amount")
        else {
            if (CURRENT_BALANCE)
                localStorage.setItem("WALLET_BALANCE", JSON.stringify(parseInt(balanceInput) + parseInt(CURRENT_BALANCE)))
            else
                localStorage.setItem("WALLET_BALANCE", balanceInput);
            cancelHandler();
        }
    }

    return (
        <div className={styles.overlay}>
            <div
                className={styles.modal}
            >
                <p className={styles.modalHeading}>Add Balance</p>
                <div className={styles.balanceFormContainer}>
                    <input className={styles.balanceInput} type="number" placeholder="Income Amount" onChange={(e) => setBalanceInput(e.target.value)} />
                    <button className={`${styles.addButton} cursor-pointer`} onClick={addBalanceHandler}>Add Balance</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddBalanceModal;