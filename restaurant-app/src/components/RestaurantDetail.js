import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css'; // Import your CSS file

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`https://zomatolisting-bss33nn7y.vercel.app/restaurantsDetails/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Restaurant not found');
        }
        const data = await response.json();
        setRestaurant(data.details); // Assuming data.details contains the restaurant details object
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (loading) return <div className="restaurant-details-container">Loading...</div>;

  if (error) return <div className="restaurant-details-container">Restaurant not found</div>;

  if (!restaurant) return null; // Handle case if restaurant details are not available

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-box">
        <img src={restaurant.featured_image} alt={restaurant.name} className="restaurant-image" />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-cuisines"><strong>Cuisines:</strong> {restaurant.cuisines}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Menu URL:</strong> <a href={restaurant.menu_url}>{restaurant.menu_url}</a></p>
          <p><strong>Average Cost for Two:</strong> {restaurant.average_cost_for_two}</p>
          <p><strong>Aggregate Rating:</strong> {restaurant.aggregate_rating}</p>
          <p><strong>Rating Text:</strong> {restaurant.rating_text}</p>
          <p><strong>Rating Color:</strong> {restaurant.rating_color}</p>
          <p><strong>Votes:</strong> {restaurant.votes}</p>
          <p><strong>Location:</strong> {restaurant.latitude}, {restaurant.longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
