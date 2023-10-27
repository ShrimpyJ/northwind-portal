import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className="header-container">
            <div className="logo">Northwind Portal</div>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/employees">Employees</Link>
                <Link to="/reports">Reports</Link>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;
