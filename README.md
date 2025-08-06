# Grail

## Overview
Grail is a full-stack web application that replicates a marketplace platform for sneaker reselling, inspired by sites like Depop. Users can register, browse listings, add their own sneakers for sale, and manage their cart with ease.

This project was created as the final capstone for a full-stack software engineering bootcamp at General Assembly.

## Deployment Link 

https://grail-app-d78d5afb6860.herokuapp.com/

## Features

User Authentication: Users can sign up, log in, and manage their profiles.

Listing Management: Create, edit, and delete sneaker listings.

Shopping Cart: Add sneakers to your cart and manage your purchases.

Responsive Design: The application is responsive, providing an optimal user experience across devices.

## Technologies Used

- Frontend: React, TailwindCSS
- Backend: Django REST Framework, Python
- Database: PostgreSQL
- Other Tools:
- Vite (build tool for React)
- Insomnia (API testing)
- Git (Version Control)

## Planning

<img width="1261" alt="Screenshot 2024-10-17 at 23 58 20" src="https://github.com/user-attachments/assets/7e2d8023-eda8-4db2-9a5a-4ce52e201e41">
<img width="962" alt="Screenshot 2024-10-17 at 23 58 40" src="https://github.com/user-attachments/assets/fb8621a6-359f-40f0-a07e-99bcb3c6fd2f"> 


## Build/Code Process

Day 1: Concept Study and Wireframing

- Reviewed previous full-stack projects to define the scope and features to include in this sneaker marketplace.
- Decided on the theme of a Depop-style sneaker resale marketplace, focusing on user-friendly functionality.
- Created a wireframe to outline the structure of the app, detailing key pages like the product listings and shopping cart.
- Drafted initial database models, including users, products (sneakers), and cart items.

Day 2: Project Setup and Backend Kick-off

- Initialized the project repository on GitHub and cloned it locally.
- Set up the backend with Python, Django, and PostgreSQL, defining models for users, sneakers and cart items.
- Created and tested API endpoints using Insomnia to ensure proper communication with the database.

Day 3: Backend Logic and API Completion

- Finalized API endpoints, enabling CRUD functionality (Create, Read, Update, Delete) for sneakers, users, and cart items.
- Fine-tuned item models

Day 4: Backend Completion and Frontend Setup

- Completed final iterations on backend logic, gathered seed data for the sneaker inventory, and pushed to the development branch.
- Set up the frontend environment using React, and established routes for key pages like home, register/login, users, and shopping carts.

Day 5: Frontend Development

- Designed the landing page, focusing on sleek visuals and intuitive navigation.
- Completed the layout and functionality of the header and footer components, including navigation and search bars.
- Developed the login and registration pages 
- Integrated Cloudinary to enable sneaker image uploads on the platform.

Day 6: CRUD Implementation and Feature Development

- Despite challenges, ensured all CRUD functionalities were fully operational.
- Linked routes to navigation components and designed the home feed and cart pages.
- Created the "Add Item" modal, allowing users to list for sale.
- Developed a detailed single product view, complete with a carousel, price and add to cart button

Day 7: Final Design Touches

- Developed a search bar with full filtering and search logic, allowing users to browse the marketplace by sneaker, brand, or user.
- Added final styling enhancements, improved UI elements for better user experience.

  
<img width="1439" alt="Screenshot 2024-10-18 at 00 09 40" src="https://github.com/user-attachments/assets/f6de82f3-9d29-4795-95a9-40d69e566306">

<img width="1427" alt="Screenshot 2024-10-18 at 00 10 01" src="https://github.com/user-attachments/assets/523db7d2-cc57-43e2-b573-cc8117b8f1a3">

<img width="1426" alt="Screenshot 2024-10-18 at 00 10 18" src="https://github.com/user-attachments/assets/103cb58a-9bef-484b-b4f8-e642b9faf66c">




## Usage
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
