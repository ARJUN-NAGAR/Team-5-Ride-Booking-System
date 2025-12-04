🚕 Team-5 Ride Booking System
A Real-Time Ride Hailing Platform (Ola/Uber Lite)

📌 Overview
The Ride Booking System is a full-stack web application that connects riders with nearby drivers in real-time.
It provides features like ride matching, live tracking, fare estimation, trip management, and an admin dashboard.
Built for learning + hackathon/demo purposes using Node.js, Express, MongoDB, React.js, and Socket.io.

🚀 Features

🧑‍🤝‍🧑 Rider App
1.Select pickup & drop locations on map
2.View fare estimate before booking
3.Request ride & get matched to nearest available driver
4.Live tracking of driver using WebSockets
5.View trip summary after ride completion

🚗 Driver App

1.Toggle Online/Offline
2.Accept/Reject ride requests
3.Navigate to pickup & destination
4.Send live location updates
5.Manage trip states: Arriving → Started → Completed

🏗️ Tech Stack

Frontend
1.React.js
2.React Router
3.Axios
4.Map Integration (Google Maps / Mapbox / Leaflet)
5.Socket.io Client

Backend
1.Node.js
2.Express.js
3.Socket.io
4.MongoDB + Mongoose (GeoJSON support)
5.Postman (API testing)

📂 Project Structure
Team-5-Ride-Booking-System/
│
├── Backend/
│   ├── server.js
│   ├── /config
│   ├── /models
│   ├── /routes
│   ├── /controllers
│   └── /sockets
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    ├── public/
    └── package.json
⚙️ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/<your-username>/Team-5-Ride-Booking-System.git
cd Team-5-Ride-Booking-System

🖥️ Backend Setup

Install dependencies:
cd Backend
npm install

Create .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

Start Backend:
npm start

Backend runs at:
http://localhost:5000

🌐 Frontend Setup

Install dependencies:
cd frontend
npm install

Run Dev Server:
npm run dev

Frontend runs at:
http://localhost:3000/

🧮 Fare Calculation Logic

totalFare = baseFare + (perKm * distance) + (perMin * time)

📊 Database Models
1.User (Rider)
2.Driver (with GeoJSON location)
3.Trip/Ride
4.Config (pricing)

🧠 Matching Algorithm (Nearest Driver)
MongoDB GeoJSON Query:
$near: {
  $geometry: { type: "Point", coordinates: [lng, lat] },
  $maxDistance: 5000   // 5 km radius
}

🛣️ Roadmap (Future Enhancements)
1.Payment integration
2.OTP-based ride start
3.Push notifications
4.Driver earnings dashboard
5.Surge pricing
6.AI-based ETA prediction

👥 Team Members
Arsh
Arjun
Ananya
Ankur

📜 License
This project is open-source and available under the MIT License.
