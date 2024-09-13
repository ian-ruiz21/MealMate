import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MealMate</h1>
          <p>Discover, Share, and Plan Your Perfect Recipes</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </div>
      </header>

      <section className="features">
        <h2>What MealMate Can Do For You</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Discover Recipes</h3>
            <p>Explore a wide variety of recipes shared by users from around the world.</p>
          </div>
          <div className="feature">
            <h3>Create & Share</h3>
            <p>Create and share your own recipes, make them public or private with ease.</p>
          </div>
          <div className="feature">
            <h3>Plan Your Meals</h3>
            <p>Organize your meals for the week with our simple and effective meal planner.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Planning Your Meals Today</h2>
        <p>Join our community of food enthusiasts and make meal planning easy!</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>

      <footer className="homepage-footer">
        <p>© 2024 MealMate. All rights reserved.</p>
        <div className="social-icons">
        </div>
      </footer>
    </div>
  );
}

export default HomePage;