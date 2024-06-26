import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import styles from "./ExpenseModal.module.css";
import { MenuItem } from "@mui/material";

function ExpenseModal({type, selectedExpense, addExpenseHandler, updateExpenseHandler, cancelHandler}) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("")

    const addHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            const request = {id: Math.floor(Math.random()*1000), category, title, price, date};
            addExpenseHandler(request);
        }
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const updateRequest = {
            id: selectedExpense.id,
            title: title ? title : selectedExpense.title,
            price: price ? price : selectedExpense.price,
            category: category ? category : selectedExpense.category,
            date: date ? date : selectedExpense.date
        };
        if (validateUpdateRequest(updateRequest)) {
            updateExpenseHandler(updateRequest);
        }
    }

    const validate = () => {
        if (!title || !price || !category || !date)
            return false;
        return true;
    }

    const validateUpdateRequest = (req) => {
        if (!req.title || !req.price || !req.category || !req.date)
            return false;
        return true;
    }

    if (type === 'add')
        return (
            <div className={styles.overlay}>
                <div 
                    className={styles.modal}
                >
                <p className={styles.modalHeading}>Add Expenses</p>
                <form onSubmit={addHandler} className={styles.expenseFormContainer}>
                    <TextField style={{width: '223px'}} onChange={(e) => setTitle(e.target.value)} id="title" label="Title" variant="outlined" required />
                    <TextField style={{width: '223px'}} onChange={((e) => setPrice(e.target.value))} type="number" label="Price" id="price" variant="outlined" required />
                    <TextField style={{width: '223px'}} select onChange={((e) => setCategory(e.target.value))} name="Category Dropdown" label="Select Category" id="category" required>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Travel">Travel</MenuItem>
                    </TextField>
                    <TextField style={{width: '223px'}} onChange={(e) => setDate(e.target.value)} type="date" variant="outlined" id="date" required />
                    <button type="submit" className={`${styles.addButton} cursor-pointer`}>Add Expense</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </form>
                </div>
            </div>
        )
    if (type === "edit")
        return (
            <div className={styles.overlay}>
                <div 
                    className={styles.modal}
                >
                <p className={styles.modalHeading}>Edit Expenses</p>
                <form onSubmit={updateHandler} className={styles.expenseFormContainer}>
                    <TextField style={{width: '223px'}} onChange={(e) => setTitle(e.target.value)} type="text" label="Title" variant="outlined" defaultValue={selectedExpense.title} id="title" required />
                    <TextField style={{width: '223px'}} onChange={(e) => setPrice(e.target.value)} type="number" label="Price" variant="outlined" defaultValue={selectedExpense.price} id="price" required/>
                    <TextField style={{width: '223px'}} fullWidth select onChange={(e) => setCategory(e.target.value)} name="Category Dropdown" label="Select Category" variant="outlined" defaultValue={selectedExpense.category} required id="category">
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Travel">Travel</MenuItem>
                    </TextField>
                    <TextField style={{width: '223px'}} onChange={(e) => setDate(e.target.value)} type="date" variant="outlined" defaultValue={selectedExpense.date} id="date" required/>
                    <button type="submit" className={`${styles.addButton} cursor-pointer`}>Update Expense</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </form>
                </div>
            </div>
        )
}

export default ExpenseModal