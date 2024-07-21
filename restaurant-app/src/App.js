import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
