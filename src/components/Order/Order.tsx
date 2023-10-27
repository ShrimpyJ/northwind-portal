import React from 'react';
import './Order.css';
import Header from '../shared/Header/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
import * as NumericInput from 'react-numeric-input'

interface OrderData {
    id: number;
    name: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    supplierName: string;
    categoryName: string;
}

interface CustomerRow {
    id: string
    name: string
}

const Order: React.FC = () => {
    const [customers, setCustomers] = useState<CustomerRow[]>([])
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [country, setCountry] = useState<string>('')


    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5228/api/Customers/get-names')

            if (response.status >= 200 && response.status <= 299) {
                console.log('Customers retrieved.', response);
                if (response.data) {
                    setCustomers(response.data)
                }
            } else {
                console.error('Retrieval failed:', response.data.message);
            }
        } catch (error: any) {
            console.error('An error occurred while retrieving data', error);
        }
    }

    const handleCustomerChange = (event: any) => {
        setSelectedCustomerId(event.target.value)
    }

    const handlePlaceOrder = () => {

    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <div className="order-container">
            <Header />
            <h2>Orders</h2>

            <div className="order-form">
                <label>Customer:</label>
                <select onChange={handleCustomerChange} value={selectedCustomerId}>
                    <option value="" disabled>Select Customer ID</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>

                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />

                <label>Address:</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} />

                <label>City:</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} />

                <label>Region:</label>
                <input type="text" value={region} onChange={e => setRegion(e.target.value)} />

                <label>Postal Code:</label>
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} />

                <label>Country:</label>
                <input type="text" value={country} onChange={e => setCountry(e.target.value)} />

                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>

        </div>
    );
};

export default Order