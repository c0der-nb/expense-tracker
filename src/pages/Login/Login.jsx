import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import {config} from '../../App';

function Login({ placeholder }) {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const validateLoginForm = () => {
        for (const key in loginForm)
            if (!loginForm[key].trim())
                return false;
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateLoginForm)
            return;
        try {
            const res = await fetch(`${config.endpoint}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(loginForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                const resJson = await res.json();
                persistLoginInfo(resJson["Authorization"]);
                enqueueSnackbar("Log in successful")
                navigate("/homepage");
            }
            if (res.status === 401) {
                enqueueSnackbar("Invalid email or password", {
                    anchorOrigin: {
                        horizontal: "center",
                        vertical: "bottom"
                }})
            }
        }
        catch (ex) {
            console.log(ex)
        }
    }

    const persistLoginInfo = (token) => {
        localStorage.setItem("email", loginForm.email)
        localStorage.setItem("token", token)
    }

    useEffect(() => {
    // if (localStorage.getItem('token'))
    //     navigate('/homepage')
    }, [])

    return (
        <div className={styles.container}>
            <form className={styles.loginCard} onSubmit={submitHandler}>
                <div>
                    <label htmlFor='email'>EMAIL</label>
                    <input type='email' onChange={(e) => setLoginForm((prev) => ({...prev, email: e.target.value}))} id='email' required />
                </div>
                <div>
                    <label htmlFor='password'>PASSWORD</label>
                    <input type='password' onChange={(e) => setLoginForm((prev) => ({...prev, password: e.target.value}))} id='password' required />
                </div>
                <div>
                    <button className={styles.btnSubmit} type='submit'>Submit</button>
                </div>
                <div>
                    <p>Don't have an account? <Link to='/register'>Click here to register.</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;