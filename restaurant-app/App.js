import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RestaurantList />} />
                <Route path="/restaurants/:restaurantId" element={<RestaurantDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
