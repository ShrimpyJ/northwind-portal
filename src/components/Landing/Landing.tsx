import React, { useState, useEffect } from 'react';
import './Landing.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Landing: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errorMsg, setErrorMsg] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [])


    const handleLogin = async () => {
        setErrorMsg('');

        try {
            const response = await axios.post('http://localhost:5228/api/Auth/login', {
                username: username,
                password: password
            });

            if (response.status >= 200 && response.status <= 299) {
                const token = response.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                console.log('Successfully logged in!', response.data);
                navigate('/dashboard')
            } else {
                console.error('Login failed:', response.data.message);
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('Login failed: Unauthorized')
                setErrorMsg('Invalid username or password.')
            }
            console.error('An error occurred while trying to log in:', error);
        }
    };

    return (
        <div className="landing-container">
            <h2>Welcome to Northwind Portal</h2>
            <div className="login-form">
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
                <button onClick={handleLogin}>Login</button>
                <a href='/register'>Register new account</a>
                <div style={{color: 'red'}}>{errorMsg}</div>
            </div>
        </div>
    );
};

export default Landing;
