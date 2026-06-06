# InAmigos Foundation Redesign

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for the InAmigos Foundation — a Section 8 registered non-profit based in India focused on hunger relief, education, animal welfare, women's empowerment, environment, and skill development.

This project features immersive 3D visuals using Three.js / React Three Fiber, styled with Tailwind CSS, and structured with smooth cinematic routing via Framer Motion.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **3D Engine**: Three.js via `@react-three/fiber` + `@react-three/drei`
- **Animations**: GSAP + Framer Motion
- **Routing**: React Router v6
- **State Management**: Zustand

### Backend
- **Framework**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt (admin panel)
- **Email**: Nodemailer (contact form)

## 📂 Project Structure

- `/client` - React frontend application
- `/server` - Node.js Express backend API

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Awanish9230/inamigos_redsign.git
   cd inamigos_redsign
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Development Servers**

   Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

   Start the frontend server (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

## 🎨 Design System

- **Primary Colors**: Deep Navy (`#0D1B2A`), Saffron (`#FF6B00`), Emerald (`#00C875`)
- **Typography**: Clash Display (Headings), Satoshi (Body)

## 📝 License

This project is licensed under the MIT License.
