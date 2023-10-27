import React from 'react';
import './Product.css';
import Header from '../shared/Header/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
import * as NumericInput from 'react-numeric-input'

interface ProductData {
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

const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<ProductData[]>([]);
    const [showBackorders, setShowBackorders] = useState(false);

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }

        const sortedProducts = [...products].sort((a: any, b: any) => {
            const fieldA: any = a[field];
            const fieldB: any = b[field];

            if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setProducts(sortedProducts);
    };

    const handleOrderMoreSupply = (productId: number) => {

    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5228/api/Products/');

            if (response.status >= 200 && response.status <= 299) {
                console.log('Products retrieved.', response);
                if (response.data) {
                    setProducts(response.data.data)
                }
            } else {
                console.error('Retrieval failed:', response.data.message);
            }
        } catch (error: any) {
            console.error('An error occurred while retrieving data', error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (showBackorders) {
            const backorderedProducts = products.filter(p => p.unitsInStock + p.unitsOnOrder < p.reorderLevel)
            setDisplayedProducts(backorderedProducts)
        } else {
            setDisplayedProducts(products)
        }
    }, [showBackorders, products])

    return (
        <div className="product-container">
            <Header />
            <h2>Products</h2>

            <div className="filters">
                <label>
                    <input 
                        type="radio"
                        value="all"
                        checked={!showBackorders}
                        onChange={(e) => setShowBackorders(false)}
                    />
                   All Products 
                </label>
                <label>
                    <input 
                        type="radio"
                        value="backorders"
                        checked={showBackorders}
                        onChange={(e) => setShowBackorders(true)}
                    />
                    Backorders
                </label>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('supplierName')}>Supplier</th>
                        <th onClick={() => handleSort('categoryName')}>Category</th>
                        <th onClick={() => handleSort('quantityPerUnit')}>Quantity Per Unit</th>
                        <th onClick={() => handleSort('unitPrice')}>Unit Price</th>
                        <th onClick={() => handleSort('unitsInStock')}>Units In Stock</th>
                        <th onClick={() => handleSort('unitsOnOrder')}>Units On Order</th>
                        <th onClick={() => handleSort('reorderLevel')}>Reorder Level</th>
                        <th onClick={() => handleSort('discontinued')}>Discontinued</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.supplierName}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.quantityPerUnit}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.unitsInStock}</td>
                            <td>{product.unitsOnOrder}</td>
                            <td>{product.reorderLevel}</td>
                            <td>{product.discontinued ? 'Yes' : 'No'}</td>
                            <td>
                                <input type="number" />
                                <button onClick={() => handleOrderMoreSupply(product.id)}>
                                    Order More
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
