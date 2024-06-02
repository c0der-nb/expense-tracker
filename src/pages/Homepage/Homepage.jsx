import React, { useState, useEffect } from 'react';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';
import TopExpenses from '../../TopExpenses/TopExpenses';
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal';
import AddBalanceModal from '../../components/AddBalanceModal/AddBalanceModal';

let INITIAL_EXPENSES = [
    {
        id: 1,
        category: "Food",
        title: "Samosa",
        price: "150",
        date: "2024-03-23"
    },
    {
        id: 2,
        category: "Entertainment",
        title: "Movie",
        price: "300",
        date: "2024-03-22"
    },
    {
        id: 3,
        category: "Travel",
        title: "Auto",
        price: "50",
        date: "2024-03-21"
    },
    {
        id: 4,
        category: "Travel",
        title: "Auto",
        price: "50",
        date: "2024-03-21"
    }
]

function Homepage() {
    const [addModalActive, setAddModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [balanceModalActive, setBalanceModalActive] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState({});

    const addModalStateHandler = (isAddModalActive) => setAddModalActive(isAddModalActive);
    const editModalStateHandler = (expense, isEditModalActive) => {
        setSelectedExpense(expense);
        setEditModalActive(isEditModalActive);
    }
    const balanceModalStateHandler = (isBalanceModalActive) => setBalanceModalActive(isBalanceModalActive);
    const closeModal = () => {
        setAddModalActive(false);
        setEditModalActive(false);
        setBalanceModalActive(false);
    }
    const addExpenseHandler = (expense) => {
        setExpenses([expense, ...expenses])
        closeModal();
        persistChanges(expense);
    }
    const updateExpenseHandler = (expense) => {
        const index = expenses.findIndex((val) => val.id === expense.id);
        expenses[index] = expense;
        setExpenses(expenses);
        closeModal();
        persistChanges();
    }
    const persistChanges = (expense) => {
        const updatedExpense = [expense, ...expenses]
        localStorage.setItem("EXPENSES", JSON.stringify(updatedExpense));
    }

    useEffect(() => {
        localStorage.setItem("WALLET_BALANCE", "5000")
        setExpenses(INITIAL_EXPENSES)
        const expenses = JSON.parse(localStorage.getItem("EXPENSES"));
        if (expenses)
            setExpenses(expenses);
    }, [])

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <Hero addModalStateHandler={addModalStateHandler} balanceModalStateHandler={balanceModalStateHandler} />
            {addModalActive && <ExpenseModal addExpenseHandler={addExpenseHandler} type="add" cancelHandler={closeModal} />}
            {editModalActive && <ExpenseModal selectedExpense={selectedExpense} updateExpenseHandler={updateExpenseHandler} type="edit" cancelHandler={closeModal} />}
            {balanceModalActive && <AddBalanceModal cancelHandler={closeModal} />}
            <div className={styles.main}>
                <div className={styles.transactions}>
                    <h4>Recent Transactions</h4>
                    <Transactions expenses={expenses} editModalStateHandler={editModalStateHandler} />
                </div>
                <div className={styles.topExpenses}>
                    <h4>Top Expenses</h4>
                    <TopExpenses />
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Homepage;