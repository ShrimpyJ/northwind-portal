import React from 'react';
import './Dashboard.css';
import './OrderRow.css'
import Header from '../shared/Header/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface OrderPreview {
    id: number
    customerId: string
    orderDate: any
    requiredDate: any
    shippedDate: any
    shipCountry: string
}

const OrderRow: React.FC<OrderPreview> = ({ id, customerId, orderDate, requiredDate, shippedDate, shipCountry }) => {
    const formatDate = (date: string) => {
        return date.split('T')[0]
    }

    const getShippingStatus = () => {
        const required = new Date(requiredDate)
        required.setHours(0, 0, 0, 0)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (shippedDate){
            const shipped = new Date(shippedDate)
            shipped.setHours(0, 0, 0, 0)

            if (shipped <= required) return 'green'
            else return 'blue'
        }
        else if (today > required) return 'red'
        else return 'orange'
    }

    return (
      <div className="order-row">
          <span className="customer-id">{customerId}</span>
          <span className="ship-country">Shipping to {shipCountry}</span>
          <div className="dates">
                <span>Placed on: {formatDate(orderDate)}</span>
                <span>Required by: {formatDate(requiredDate)}</span>
          </div>
          <span className="shipped-date">{shippedDate ? 'Received on: ' + formatDate(shippedDate) : 'Not Received'}</span>
          <span className="status-indicator" style={{ backgroundColor: getShippingStatus() }}></span>
        </div>
    )
}

const Dashboard: React.FC = () => {
    const [ordersPreview, setOrdersPreview] = useState<OrderPreview[]>([])

    const fetchOrdersPreview = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:5228/api/Orders/user-preview', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.data.success) {
                console.log('Orders retrieved.', response);
                if (response.data) {
                    setOrdersPreview(response.data.data)
                }
            } else {
                console.error('Retrieval failed:', response.data.message);
            }

        } catch (error: any) {
            console.error('An error occurred while retrieving data', error);
        }
    }

    useEffect(() => {
        fetchOrdersPreview()
    }, [])

    return (
        <div className="dashboard-container">
            <Header />
            <h2>Dashboard</h2>

            <h3>Recent Orders</h3>
            {ordersPreview.map(order => (
                <OrderRow
                    id={order.id}
                    customerId={order.customerId}
                    shipCountry={order.shipCountry}
                    orderDate={order.orderDate}
                    requiredDate={order.requiredDate}
                    shippedDate={order.shippedDate}
                />
            ))}
        </div>
    )
}

export default Dashboard