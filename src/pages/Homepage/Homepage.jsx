import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';
import TopExpenses from '../../components/TopExpenses/TopExpenses';
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal';
import AddBalanceModal from '../../components/AddBalanceModal/AddBalanceModal';

const INITIAL_EXPENSES = [
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
    const [totalExpenses, setTotalExpenses] = useState("");
    const [selectedExpense, setSelectedExpense] = useState({});
    
    const WALLET_BALANCE = localStorage.getItem("WALLET_BALANCE");

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
        if (WALLET_BALANCE && parseInt(expense.price) > WALLET_BALANCE)
            enqueueSnackbar("Expense can't be greater than your wallet balance.", {
                anchorOrigin: {
                    horizontal: "center",
                    vertical: "bottom"
                }});
        else {
            setExpenses([expense, ...expenses])
            closeModal();
            persistChanges(expense);
        }
    }
    const updateExpenseHandler = (expense) => {
        const index = expenses.findIndex((val) => val.id === expense.id);
        expenses[index] = expense;
        setExpenses(expenses);
        updateTotalExpense();
        closeModal();
        pesistUpdateChanges(expense);
    }
    const deleteExpenseHandler = (id) => {
        const index = expenses.findIndex((expense) => expense.id === id);
        let updatedExpenses = expenses.toSpliced(index, 1);
        if (updatedExpenses)
            setExpenses(updatedExpenses);
        persistDeleteChanges(id);
    }
    const persistChanges = (expense) => {
        const updatedExpense = [expense, ...expenses]
        localStorage.setItem("EXPENSES", JSON.stringify(updatedExpense));
        localStorage.setItem("WALLET_BALANCE", JSON.stringify(WALLET_BALANCE-expense.price));
    }
    const pesistUpdateChanges = (expense) => {
        const index = expenses.findIndex((val) => val.id === expense.id);
        expenses[index] = expense;
        localStorage.setItem("EXPENSES", JSON.stringify(expenses));
    }
    const persistDeleteChanges = (id) => {
        const index = expenses.findIndex((expense) => expense.id === id);
        let updatedExpenses = expenses.toSpliced(index, 1);
        localStorage.setItem("EXPENSES", JSON.stringify(updatedExpenses));
    }
    const updateTotalExpense = () => {
        const totalExpense = expenses.reduce((acc, cv) => acc+parseInt(cv.price),0);
        setTotalExpenses(totalExpense);
    }

    useEffect(() => {
        if (!localStorage.getItem("WALLET_BALANCE"))
            localStorage.setItem("WALLET_BALANCE", "5000")
        const expenses = JSON.parse(localStorage.getItem("EXPENSES"));
        if (expenses) {
            setExpenses(expenses);
        }
        else {
            setExpenses(INITIAL_EXPENSES);
        }
    }, [])

    useEffect(() => {
        updateTotalExpense();
    }, [expenses])

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <div className={styles.heroWrapper}>
                <Hero expenses={expenses} addModalStateHandler={addModalStateHandler} balanceModalStateHandler={balanceModalStateHandler} totalExpenses={totalExpenses} />
            </div>
            {addModalActive && <ExpenseModal addExpenseHandler={addExpenseHandler} type="add" cancelHandler={closeModal} />}
            {editModalActive && <ExpenseModal selectedExpense={selectedExpense} updateExpenseHandler={updateExpenseHandler} type="edit" cancelHandler={closeModal} />}
            {balanceModalActive && <AddBalanceModal cancelHandler={closeModal} />}
            <div className={styles.main}>
                <div className={styles.transactions}>
                    <h4>Recent Transactions</h4>
                    <Transactions expenses={expenses} editModalStateHandler={editModalStateHandler} deleteExpenseHandler={deleteExpenseHandler} />
                </div>
                <div className={styles.topExpenses}>
                    <h4>Top Expenses</h4>
                    <TopExpenses data={expenses} />
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Homepage;