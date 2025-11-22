import React from 'react';
import styles from './Header.module.css';
import ApiService from '../../api/api';
import { ReactComponent as UserIcon } from '../../assets/user-solid-full.svg';
import { enqueueSnackbar } from 'notistack';

function Header() {
    const logout = async () => {
        try {
            const response = await ApiService.logout();
            if (response.status === 401) {
                enqueueSnackbar('Session expire. Login again');
                localStorage.clear();
                window.location.reload();
            }
            if (response.status === 200) {
                enqueueSnackbar("You're logged out!");
                localStorage.clear();
                window.location.reload();
            }
        }
        catch {
            localStorage.clear();
            window.location.reload();
        }
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.etHeading}><b>Expense Tracker</b></h3>
            <div>
                <UserIcon />
                <p>{localStorage.getItem('email')}</p>
                <button className={styles.logoutButton} onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Header;