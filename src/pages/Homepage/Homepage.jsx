import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';
import TopExpenses from '../../components/TopExpenses/TopExpenses';
import Header from '../../components/Header/Header';
import ApiService from '../../api/api';

const ExpenseModal = lazy(() => import('../../components/ExpenseModal/ExpenseModal'));
const AddBalanceModal = lazy(() => import('../../components/AddBalanceModal/AddBalanceModal'));
const DeleteExpenseConfirmModal = lazy(() => import('../../DeleteExpenseConfirmModal/DeleteExpenseConfirmModal'));


function Homepage() {
    const [addModalActive, setAddModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [balanceModalActive, setBalanceModalActive] = useState(false);
    const [confirmDeleteModalActive, setConfirmDeleteModalActive] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState("");
    const [selectedExpense, setSelectedExpense] = useState({});
    const [walletBalance, setWalletBalance] = useState(0);
    const [isWalletLoading, setWalletLoading] = useState(false);
    const [isExpenseLoading, setExpenseLoading] = useState(false);
    const navigate = useNavigate();
    const [isLoadingAddEditExpense, setLoadingAddEditExpense] = useState({
        add: false,
        edit: false
    })
    const [isDeleteLoading, setDeleteLoading] = useState({
        loading: false,
        id: 0
    })

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
        setConfirmDeleteModalActive(false);
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
            setLoadingAddEditExpense((prev) => ({...prev, add: true}))
            const response = await ApiService.addExpense(expense);
            const newExpense = await response.json();
            setLoadingAddEditExpense((prev) => ({...prev, add: false}))
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
            setLoadingAddEditExpense((prev) => ({...prev, add: false}))
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
            setLoadingAddEditExpense((prev) => ({...prev, edit: true}));
            const response = await ApiService.updateExpense(expense.id, expense);
            setLoadingAddEditExpense((prev) => ({...prev, edit: false}))
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
            setLoadingAddEditExpense((prev) => ({...prev, edit: false}))
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }

    const deleteExpenseHandler = (id) => {
        setConfirmDeleteModalActive(true);
        setDeleteLoading((prev) => ({...prev, id: id}));
    }

    const deleteExpense = async (id) => {
        try {
            closeModal();
            setDeleteLoading({loading: true, id: id});
            const response = await ApiService.deleteExpense(id);
            setDeleteLoading({loading: false, id: id});
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
            setDeleteLoading({loading: false, id: id});
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
            const response = await ApiService.getWalletBalance();
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
            const response = await ApiService.getAllExpenses();
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
            {addModalActive && <Suspense fallback={<div>Loading...</div>}><ExpenseModal addExpenseHandler={addExpenseHandler} type="add" cancelHandler={closeModal} isLoading={isLoadingAddEditExpense} /></Suspense>}
            {editModalActive && <Suspense fallback={<div>Loading...</div>}><ExpenseModal selectedExpense={selectedExpense} updateExpenseHandler={updateExpenseHandler} type="edit" cancelHandler={closeModal} isLoading={isLoadingAddEditExpense} /></Suspense>}
            {balanceModalActive && <Suspense fallback={<div>Loading...</div>}><AddBalanceModal cancelHandler={closeModal} updateWalletBalance={updateWalletBalance} /></Suspense>}
            {confirmDeleteModalActive && <Suspense fallback={<div>Loading...</div>}><DeleteExpenseConfirmModal id={isDeleteLoading.id} deleteExpenseHandler={(id) => {deleteExpense(id);}} cancelHandler={closeModal} /></Suspense>}
            <div className={styles.main}>
                <div className={styles.transactions}>
                    <h4>Recent Transactions</h4>
                    <Transactions expenses={expenses} editModalStateHandler={editModalStateHandler} deleteExpenseHandler={deleteExpenseHandler} isLoading={isDeleteLoading} />
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