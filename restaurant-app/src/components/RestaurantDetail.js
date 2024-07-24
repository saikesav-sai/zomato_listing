import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css'; 

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [result, setResult] =useState(false);

  
  const feedback = async () => {
    try {
      const rating_number = document.getElementById('rating_number').value;
      const rating_text = document.getElementById('rating_text').value;
      const res_id = restaurantId;
      const response = await fetch(`http://127.0.0.1:8000/postFeedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: rating_number,
          rating_text: rating_text,
          res_id: res_id
        })
      });
      if (response.ok) {
        setResult("Feedback submitted successfully");
      } else {
        setResult("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error calling fetch", error);
      setResult("Error submitting feedback");
    }
  }


  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`https://zomatolisting-bss33nn7y.vercel.app/restaurantsDetails/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Restaurant not found');
        }
        const data = await response.json();
        setRestaurant(data.details); 
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

  if (!restaurant) return null; 

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-box">
        <img src={restaurant.featured_image} alt={restaurant.name} className="restaurant-image" />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-cuisines"><strong>Cuisines:</strong> {restaurant.cuisines}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Average Cost for Two:</strong> {restaurant.average_cost_for_two}</p>
          <p><strong>Location:</strong> {restaurant.latitude}, {restaurant.longitude}</p>
          <p><strong>Aggregate Rating:</strong> {restaurant.aggregate_rating}</p>
          <p><strong>Rating Text:</strong> {restaurant.rating_text}</p>
          <p><strong>Rating Color:</strong> {restaurant.rating_color}</p>
          <p><strong>Votes:</strong> {restaurant.votes}</p>
        </div>
        <div className="user_rating">
           
          <center><h2>Feedback</h2>
          <p><strong>Rate the restaurant : </strong>  <textarea id="rating_number"></textarea></p>
          <p><strong>Give your feedback :</strong> <textarea id="rating_text" ></textarea></p>
          <button id="submit_button"  onClick={() => feedback()} >Submit</button>
          <p >{result} </p></center>
          
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
