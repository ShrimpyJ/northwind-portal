import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            navigate('/dashboard');
        }
    }, [])

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleRegister = async () => {
        setErrorMsg('');

        try {
            const response = await axios.post('http://localhost:5228/register', {
                username: username,
                password: password
            });

            if (response.data.success) {
                console.log('Register successful!', response.data);
                setSuccessMsg('Register Successful!')
                await timeout(1600)
                navigate('/')
            } else {
                console.error('Register failed:', response.data.message);
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('Register failed: Unauthorized')
                setErrorMsg('Username already in use')
            }
            console.error('An error occurred while trying to register:', error);
        }
    };

    return (
        <div className="landing-container">
            <h2>Register New Account</h2>
            <div className="register-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                <a href='/'>Login to existing account</a>
                <div style={{color: 'red'}}>{errorMsg}</div>
                <h3>{successMsg}</h3>
            </div>
        </div>
    );
};

export default Register;
