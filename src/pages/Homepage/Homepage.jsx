import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';
import TopExpenses from '../../components/TopExpenses/TopExpenses';
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal';
import AddBalanceModal from '../../components/AddBalanceModal/AddBalanceModal';
import Header from '../../components/Header/Header';
import { config } from '../../App';

function Homepage() {
    const [addModalActive, setAddModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [balanceModalActive, setBalanceModalActive] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState("");
    const [selectedExpense, setSelectedExpense] = useState({});
    const [walletBalance, setWalletBalance] = useState(0);
    const [isWalletLoading, setWalletLoading] = useState(false);
    const [isExpenseLoading, setExpenseLoading] = useState(false);
    const navigate = useNavigate();

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
        if (walletBalance <= 0 || parseInt(expense.price) > walletBalance)
            enqueueSnackbar("Expense can't be greater than your wallet balance.");
        else {
            saveExpense(expense);
        }
    }
    const saveExpense = async (expense) => {
        try {
            const response = await fetch(`${config.endpoint}/expense`, {
                method: 'POST',
                body: JSON.stringify(expense),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const newExpense = await response.json();
            if (response.status === 401) {
                    enqueueSnackbar("Session expired. Please log in again.")
                    navigate('/login');
            }
            if (response.status === 201) {
                enqueueSnackbar("Expense created!")
                setExpenses([newExpense, ...expenses]);
                closeModal();
                getWalletBalance();
            }
        }
        catch (ex) {
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }
    const updateExpenseHandler = (expense) => {
        if (walletBalance <= 0 || parseInt(expense.price) > walletBalance)
            enqueueSnackbar("Expense can't be greater than your wallet balance.");
        else {
            updateExpense(expense);
        }
    }
    const updateExpense = async (expense) => {
        try {
            const response = await fetch(`${config.endpoint}/expense/${expense.id}`, {
                method: 'PUT',
                body: JSON.stringify(expense),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 401) {
                enqueueSnackbar("Session expired. Please log in again.")
                navigate('/login');
            }
            if (response.status === 200) {
                const index = expenses.findIndex((val) => val.id === expense.id);
                expenses[index] = expense;
                setExpenses(expenses);
                updateTotalExpense();
                enqueueSnackbar("Expense updated!")
                closeModal();
                getWalletBalance();
            }
        }
        catch (ex) {
            console.log(ex);
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }
    const deleteExpenseHandler = async (id) => {
        try {
            const response = await fetch(`${config.endpoint}/expense/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 401) {
                enqueueSnackbar("Session expired. Please log in again.")
                navigate('/login');
            }
            if (response.status === 200) {
                const index = expenses.findIndex((expense) => expense.id === id);
                let updatedExpenses = expenses.toSpliced(index, 1);
                setExpenses(updatedExpenses);
                enqueueSnackbar("Expense deleted!");
            }
        }
        catch (ex) {
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }

    const updateTotalExpense = () => {
        const totalExpense = expenses.reduce((acc, cv) => acc+cv.price,0);
        setTotalExpenses(totalExpense);
    }

    const getWalletBalance = async () => {
        try {
            setWalletLoading(true);
            const token = localStorage.getItem('token')
            const response = await fetch(`${config.endpoint}/user/wallet_balance`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const jsonResponse = await response.json();
            setWalletLoading(false);
            if (response.status === 401) {
                enqueueSnackbar("Session expired. Please log in again.")
                navigate('/login');
            }
            if (response.status === 200) {
                setWalletBalance(jsonResponse.wallet_balance)
            }
        }
        catch (ex) {
            setWalletLoading(false);
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }

    const updateWalletBalance = () => {
        getWalletBalance();
        closeModal();
    }

    const getExpenses = async () => {
        try {
            setExpenseLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.endpoint}/expense`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            setExpenseLoading(false);
            if (response.status === 401) {
                enqueueSnackbar("Session expired. Please log in again.")
                navigate('/login');
            }
            if (response.status === 200) {
                const expenseList = await response.json();
                setExpenses([...expenseList.data]);
            }
        }
        catch (ex) {
            setExpenseLoading(false);
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/login');
        else {
            getExpenses();
            getWalletBalance();
        }
    }, [])

    useEffect(() => {
        updateTotalExpense();
    }, [expenses])

    return (
        <>
        <Header />
        <div className={styles.wrapper}>
            <div className={styles.heroWrapper}>
                <Hero
                    expenses={expenses}
                    addModalStateHandler={addModalStateHandler}
                    balanceModalStateHandler={balanceModalStateHandler}
                    totalExpenses={totalExpenses}
                    walletBalance={walletBalance}
                    isWalletLoading={isWalletLoading}
                    isExpenseLoading={isExpenseLoading}
                />
            </div>
            {addModalActive && <ExpenseModal addExpenseHandler={addExpenseHandler} type="add" cancelHandler={closeModal} />}
            {editModalActive && <ExpenseModal selectedExpense={selectedExpense} updateExpenseHandler={updateExpenseHandler} type="edit" cancelHandler={closeModal} />}
            {balanceModalActive && <AddBalanceModal cancelHandler={closeModal} updateWalletBalance={updateWalletBalance} />}
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
        </>
    )
}

export default Homepage;