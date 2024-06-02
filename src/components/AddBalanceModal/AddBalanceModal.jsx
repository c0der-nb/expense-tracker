import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import styles from "./AddBalanceModal.module.css";
import { enqueueSnackbar } from "notistack";

function AddBalanceModal({cancelHandler}) {
    const [balanceInput, setBalanceInput] = useState("");
    const CURRENT_BALANCE = localStorage.getItem("WALLET_BALANCE");
    const addBalanceHandler = () => {
        if (!balanceInput)
            enqueueSnackbar("Please enter valid amount")
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
                    <TextField style={{width:'217px'}} type="number" label="Income Amount" variant="outlined" onChange={(e) => setBalanceInput(e.target.value)} />
                    <button className={`${styles.addButton} cursor-pointer`} onClick={addBalanceHandler}>Add Balance</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddBalanceModal;