import React, {useState} from "react";
import styles from "./ExpenseModal.module.css";
import ReactModal from "react-modal";

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
            title: title? title : selectedExpense.title,
            price: price ? price : selectedExpense.price,
            category: category? category : selectedExpense.category,
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
            <div>
                <ReactModal 
                    isOpen
                    contentLabel="Add Expense Modal"
                    overlayClassName={styles.overlay}
                    className={styles.modal}
                >
                <p className={styles.modalHeading}>Add Expenses</p>
                <div className={styles.expenseFormContainer}>
                    <input onChange={((e) => setTitle(e.target.value))} className={styles.inputBox} type="text" placeholder="Title" required />
                    <input onChange={((e) => setPrice(e.target.value))} className={styles.inputBox} type="text" placeholder="Price" required />
                    <select onChange={((e) => setCategory(e.target.value))} className={styles.inputBox} name="Category Dropdown" placeholder="Select Category" required>
                        <option hidden disabled selected>Select Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                    </select>
                    <input  onChange={(e) => setDate(e.target.value)} className={styles.inputBox} type="date" placeholder="dd/mm/yyyy" required />
                    <button onClick={addHandler} className={`${styles.addButton} cursor-pointer`}>Add Expense</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
                </ReactModal>
            </div>
        )
    if (type === "edit")
        return (
            <div>
                <ReactModal 
                    isOpen
                    contentLabel="Edit Expense Modal"
                    overlayClassName={styles.overlay}
                    className={styles.modal}
                >
                <p className={styles.modalHeading}>Edit Expenses</p>
                <div className={styles.expenseFormContainer}>
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.inputBox} type="text" placeholder="Title" defaultValue={selectedExpense.title} />
                    <input onChange={(e) => setPrice(e.target.value)} className={styles.inputBox} type="text" placeholder="Price" defaultValue={selectedExpense.price} />
                    <select onChange={(e) => setCategory(e.target.value)} className={styles.inputBox} name="Category Dropdown" placeholder="Select Category" defaultValue={selectedExpense.category}>
                        <option hidden disabled selected>Select Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                    </select>
                    <input  onChange={(e) => setDate(e.target.value)} className={styles.inputBox} type="date" placeholder="dd/mm/yyyy" defaultValue={selectedExpense.date}/>
                    <button className={`${styles.addButton} cursor-pointer`} onClick={updateHandler}>Update Expense</button>
                    <button className={`${styles.cancel} cursor-pointer`} onClick={cancelHandler}>Cancel</button>
                </div>
                </ReactModal>
            </div>
        )
}

export default ExpenseModal