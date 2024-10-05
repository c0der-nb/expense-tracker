import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { CircularProgress } from "@mui/material";
import styles from "./AddBalanceModal.module.css";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { config } from "../../App";

function AddBalanceModal({cancelHandler, updateWalletBalance}) {
    const [balanceInput, setBalanceInput] = useState("");
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const addBalanceHandler = () => {
        if (!balanceInput)
            enqueueSnackbar("Please enter valid amount");
        else {
            addBalance();
        }
    }

    const addBalance = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.endpoint}/user/wallet_balance`, {
                method: 'POST',
                body: JSON.stringify({wallet_balance: parseInt(balanceInput)}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            if (response.status === 401) {
                enqueueSnackbar("Session is expired. Please log in again.");
                navigate('/login');
            }
            if (response.status === 201) {
                enqueueSnackbar("Balance updated!");
                updateWalletBalance();
            }
        }
        catch (ex) {
            setLoading(false);
            enqueueSnackbar("Server is not responding. Try again later");
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
                    {!isLoading ? <button className={`${styles.addButton} cursor-pointer`} onClick={addBalanceHandler}>Add Balance</button>
                    :<div style={{"width": '9.0625rem', "text-align": 'center'}}>
                        <CircularProgress sx={{ color: '#F4BB4A' }} size={25} />
                     </div>}
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddBalanceModal;