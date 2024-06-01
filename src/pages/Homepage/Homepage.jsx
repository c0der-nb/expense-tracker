import React, { useState } from 'react';
import styles from './Homepage.module.css';
import Hero from '../../components/HeroSection/HeroSection';
import Transactions from '../../components/Transactions/Transactions';
import TopExpenses from '../../TopExpenses/TopExpenses';
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal';
import AddBalanceModal from '../../components/AddBalanceModal/AddBalanceModal';

function Homepage() {
    const [addModalActive, setAddModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [balanceModalActive, setBalanceModalActive] = useState(false);

    const addModalStateHandler = (isAddModalActive) => setAddModalActive(isAddModalActive);
    const editModalStateHandler = (isEditModalActive) => setEditModalActive(isEditModalActive);
    const balanceModalStateHandler = (isBalanceModalActive) => setBalanceModalActive(isBalanceModalActive);
    const closeModal = () => {
        setAddModalActive(false);
        setEditModalActive(false);
        setBalanceModalActive(false);
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <Hero addModalStateHandler={addModalStateHandler} balanceModalStateHandler={balanceModalStateHandler} />
            {addModalActive && <ExpenseModal type="add" cancelHandler={closeModal} />}
            {editModalActive && <ExpenseModal type="edit" cancelHandler={closeModal} />}
            {balanceModalActive && <AddBalanceModal cancelHandler={closeModal} />}
            <div className={styles.main}>
                <div className={styles.transactions}>
                    <h4>Recent Transactions</h4>
                    <Transactions editModalStateHandler={editModalStateHandler} />
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