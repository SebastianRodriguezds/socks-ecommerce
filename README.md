# Socks E-commerce

A full-stack e-commerce application for selling socks, built with React, Tailwind CSS, Node.js, Express, and MongoDB. The project features a backend API, Stripe payment integration, and deployment on Netlify and Render.

## Technologies
 **Frontend:** React, Tailwind CSS, React Router, React Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payments:** Stripe
- **Deployment:** Netlify (frontend), Render (backend)

## Features
- Browse all products in a catalog
- View detailed product information
- Add/remove items from the cart
- Cart persistence with localStorage
- Checkout with Stripe integration
- Order confirmation page
- User registration and login
- Admin dashboard to manage products and orders
- Fully responsive design

## Installation (Local Dev)
1. Clone the repository:
   ```bash
   git clone https://github.com/SebastianRodriguezds/socks-ecommerce.git
2. Backend setup:
   cd backend
   npm install
   npm run dev

Make sure to create a .env file with your MongoDB URI, JWT secret, and Stripe keys.
Example:
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret>
   STRIPE_WEBHOOK_SECRET=<your_webhook_secret>
3. Frontend setup:
   cd ../frontend
   npm install
   npm start

## Deployment

**Frontend:** deployed on [Netlify](https://socksecommerce.netlify.app)
Frontend .env.local or Netlify environment:
   REACT_APP_API_URL=https://socks-ecommerce.onrender.com
   REACT_APP_STRIPE_KEY=<your_stripe_public_key>

**Backend:** deployed on [Render](https://socks-ecommerce.onrender.com)
Backend Render environment:
   MONGO_URI=<mongo_uri>
   JWT_SECRET=<jwt_secret>
   STRIPE_SECRET_KEY=<stripe_secret>
   STRIPE_WEBHOOK_SECRET=<webhook_secret>
   FRONTEND_URL=https://socksecommerce.netlify.app

## Available Scripts (Frontend)
- npm start — Runs the app in development mode.

- npm run build — Builds the app for production.

- npm test — Launches the test runner.

## Learn More
- [React documentation](https://reactjs.org/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [React Router documentation](https://reactrouter.com/en/main)