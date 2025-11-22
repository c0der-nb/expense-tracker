import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import styles from './Register.module.css';
import video from '../../assets/video.mp4';
import ApiService from '../../api/api';

function Register() {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const validateForm = () => {
        for (const key in registerForm)
            if (!registerForm[key].trim())
                return false;
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm)
            return;
        try {
            setLoading(true);
            const response = await ApiService.register(registerForm);
            const jsonResponse = await response.json();
            setLoading(false);
            if (response.status === 409) {
                enqueueSnackbar("User with this email already exists.")
            }
            if (response.status === 201) {
                localStorage.setItem('email', jsonResponse.email);
                localStorage.setItem('token', jsonResponse['Authorization']);
                enqueueSnackbar("Registration successful! Login to continue.");
                navigate("/login");
            }
        }
        catch (ex) {
            setLoading(false);
            enqueueSnackbar("Server is not responding. Please try again later.")
        }
    } 

    return (
        <>
        <video autoPlay muted loop playsInline>
            <source src={video} type="video/mp4" />
        </video>
        <div className={styles.container}>
            <form className={styles.loginCard} onSubmit={submitHandler}>
                <div>
                    <TextField required onChange={(e) => setRegisterForm((prev) => ({...prev, name: e.target.value}))} type='text' id="outlined-basic" label="Name" variant="outlined" />
                </div>
                <div>
                    <TextField required onChange={(e) => setRegisterForm((prev) => ({...prev, email: e.target.value}))} type='email' id="outlined-basic" label="Email" variant="outlined" />
                </div>
                <div>
                    <TextField required type='password' id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setRegisterForm((prev) => ({...prev, password: e.target.value}))} />
                </div>
                <div>
                    {!isLoading ? <Button variant="contained" type='submit'>Register</Button>
                    : <div className={styles.spinner}><CircularProgress size={20} /></div>}
                </div>
                <div>
                    <p>Already a user? <Link to='/login'><Button><b>Click here to login</b></Button></Link></p>
                </div>
            </form>
        </div>
    </>
    )
}

export default Register;