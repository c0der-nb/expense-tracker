import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import video  from '../../assets/video.mp4';
import ApiService from '../../api/api';

function Login() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const res = await ApiService.login(loginForm);
            const resJson = await res.json();
            setIsLoading(false);
            if (res.status === 200) {
                persistLoginInfo(resJson["Authorization"]);
                enqueueSnackbar("Log in successful")
                navigate("/");
            }
            if (res.status === 401) {
                enqueueSnackbar("Invalid email or password")
            }
        }
        catch (ex) {
            setIsLoading(false);
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    }

    const persistLoginInfo = (token) => {
        localStorage.setItem("email", loginForm.email)
        localStorage.setItem("token", token)
    }

    return (
        <>
            <video autoPlay muted loop playsInline>
                <source src={video} type="video/mp4" />
            </video>
            <div className={styles.container}>
                <form className={styles.loginCard} onSubmit={submitHandler}>
                    <div>
                        <TextField required onChange={(e) => setLoginForm((prev) => ({...prev, email: e.target.value}))} type='email' id="outlined-basic" label="Email" variant="outlined" />
                    </div>
                    <div>
                        <TextField required type='password' id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setLoginForm((prev) => ({...prev, password: e.target.value}))} />
                    </div>
                    <div>
                        {!isLoading ? <Button variant="contained" type='submit'>Login</Button>
                        : <div className={styles.spinner}><CircularProgress size={20} /></div>}
                    </div>
                    <div>
                        <p>Don't have an account? <Link to='/register'><Button className={styles.clickRegister}><b>Click here to register</b></Button></Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;