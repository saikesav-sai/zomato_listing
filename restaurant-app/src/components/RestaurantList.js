import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 25;

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await fetch(`http://localhost:8000/restaurantslist?page=${currentPage}&limit=${limit}`);
            const data = await response.json();
            setRestaurants(data.restaurants);
            setTotal(data.total);
        };

        fetchRestaurants();
    }, [currentPage]);

    const totalPages = Math.ceil(total / limit);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        pageNumbers.push(1);

        if (currentPage > 3) {
            pageNumbers.push('...');
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) {
            pageNumbers.push('...');
        }

        pageNumbers.push(totalPages);

        return pageNumbers;
    };

    return (
        <div className="restaurant-list-container">
            <h1>Restaurant List</h1>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <div className="restaurant-card" key={restaurant.id}>
                        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                        <Link to={`/restaurants/${restaurant.id}`} className="restaurant-name">{restaurant.name}</Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {generatePageNumbers().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (typeof number === 'number') {
                                setCurrentPage(number);
                            }
                        }}
                        disabled={number === currentPage}
                        className={`page-number ${number === currentPage ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
