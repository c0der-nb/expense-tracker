import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import styles from "./ExpenseModal.module.css";

function ExpenseModal({type, selectedExpense, addExpenseHandler, updateExpenseHandler, cancelHandler}) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("")

    const addHandler = () => {
        if (validate()) {
            const request = {id: Math.floor(Math.random()*1000), category, title, price, date};
            addExpenseHandler(request);
        }
    }

    const updateHandler = () => {
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
                    <TextField onChange={(e) => setTitle(e.target.value)} id="title" label="Outlined" variant="outlined" />
                    <input onChange={((e) => setPrice(e.target.value))} className={styles.inputBox} type="text" placeholder="Price" id="price" required />
                    <select onChange={((e) => setCategory(e.target.value))} className={styles.inputBox} name="Category Dropdown" placeholder="Select Category" id="category" required>
                        <option hidden disabled selected>Select Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                    </select>
                    <input  onChange={(e) => setDate(e.target.value)} className={styles.inputBox} type="date" placeholder="dd/mm/yyyy" id="date" required />
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
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.inputBox} type="text" placeholder="Title" defaultValue={selectedExpense.title} id="title" required />
                    <input onChange={(e) => setPrice(e.target.value)} className={styles.inputBox} type="text" placeholder="Price" defaultValue={selectedExpense.price} id="price" required />
                    <select onChange={(e) => setCategory(e.target.value)} className={styles.inputBox} name="Category Dropdown" placeholder="Select Category" defaultValue={selectedExpense.category} id="category" required>
                        <option hidden disabled selected>Select Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                    </select>
                    <input  onChange={(e) => setDate(e.target.value)} className={styles.inputBox} type="date" placeholder="dd/mm/yyyy" defaultValue={selectedExpense.date} id="date" required/>
                    <button type="submit" className={`${styles.addButton} cursor-pointer`}>Update Expense</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </form>
                </div>
            </div>
        )
}

export default ExpenseModal