## Grail

##Overview
Grail is a full-stack web application that replicates a marketplace platform for sneaker reselling, inspired by sites like Depop. Users can register, browse listings, add their own sneakers for sale, and manage their cart with ease.

This project was created as the final capstone for a full-stack software engineering bootcamp at General Assembly.


## Features
User Authentication: Users can sign up, log in, and manage their profiles.
Listing Management: Create, edit, and delete sneaker listings.
Shopping Cart: Add sneakers to your cart and manage your purchases.
Responsive Design: The application is fully responsive, providing an optimal user experience across devices.

## Technologies Used
Frontend: React, TailwindCSS
Backend: Django REST Framework, Python
Database: PostgreSQL
Other Tools:
Vite (build tool for React)
Insomnia (API testing)
Git (Version Control)

## Installation
Prerequisites
Ensure you have Python 3.x and Node.js installed.
Ensure you have PostgreSQL installed and running.
Clone the Repository
bash
Copy code
git clone https://github.com/sixford/grail-app.git
cd grail-app
Backend Setup (Django)
Create a virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
Install backend dependencies:

bash
pip install -r requirements.txt
Create a .env file: Configure your environment variables:

makefile
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-database-url
Migrate the database:

bash
python manage.py migrate
Run the development server:

bash
python manage.py runserver
Frontend Setup (React)
Navigate to the frontend directory:

bash
cd frontend
Install frontend dependencies:

bash
npm install
Run the React development server:

bash
npm run dev
Usage
Open your browser and navigate to http://localhost:8000 for the backend API.
The frontend will be available at http://localhost:3000.
Creating a Listing
Sign up and log in to the platform.
Navigate to the List Items modal
Add details for your sneakers, upload images, and submit your listing.
Managing Your Cart
Browse available sneakers in the marketplace.
Add your desired items to the cart.
Proceed to checkout to finalize your purchase.
API Documentation
To test the backend API, you can use Insomnia or Postman.

Base URL: http://localhost:8000/api/

## Endpoints:
POST /auth/register/ – Register a new user
POST /auth/login/ – Log in a user
GET /item/ – Get all listings
POST /item/ – Create a new listing (Authenticated)
GET /cart/ – View the cart (Authenticated)


## Future Features
Payment Integration: Integrate Stripe or PayPal for real-world transactions.
Real-Time Notifications: Notify users when a product in their cart is purchased or edited.
Search and Filtering: Improve the browsing experience with more powerful search and filtering capabilities.
