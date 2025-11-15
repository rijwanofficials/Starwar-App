# Star Wars Full-Stack App

A full-stack web application built with React (frontend), Node.js + Express (backend), and MongoDB that allows users to explore Star Wars characters, planets, starships, and more. Includes user authentication with OTP verification and JWT-based session management.

Features

User Authentication
Email-based OTP verification
Secure signup with hashed passwords
Login with JWT cookie-based authentication
Logout to clear session

Star Wars Data
Fetch characters, planets, starships from SWAPI (Star Wars API)
Paginated lists for easy navigation
Search functionality for characters and planets
Responsive UI with React

Protected Routes
Only logged-in users can access favorite characters or custom lists
JWT middleware ensures secure API access

🛠️ Tech Stack
Frontend	React, Context API, Tailwind CSS 
Backend	Node.js, Express.js
Database	MongoDB
Authentication	JWT, bcrypt, OTP via email
APIs	SWAPI (Star Wars API)

Dev Tools	Postman, VS Code, Nodemon
Installation
Backend
# Clone repo
git clone https://github.com/rijwanofficials/Starwar-App
cd backend

# Install dependencies
npm install

# Create .env file
# Example:
PORT=3800
MONGO_URI=mongodb+srv://husainrijwan2001_db_user:Rijwan1234@cluster0.bq2pkdv.mongodb.net/?appName=Cluster0
SMTP_USER=husainrijwan2001@gmail.com
SMTP_PASS=qosxsmxiorsqpqqn
JWT_SECRET=jsdfviorwerbgvsndmfvposbfvuerijvmkksjfjsahjkjdsvsdkjf3456789o0poijhgfdsdfghjkjvahjfdkvhfnkfdhjabuidccjsierifoafnvjkawyefdduiekabshdcbaidfvnkjs


# Run server
npm run dev

Frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start

🧩 API Endpoints Authentication Endpoint	Method	Description

/api/v1/auth/send-otp	POST	Send OTP to email

/api/v1/auth/signup	POST	Create user after OTP verification

/api/v1/auth/login	POST	Login user and set JWT cookie

/api/v1/auth/logout	GET	Logout user and clear cookie

Example Signup Payload:

{
  "otp": "1234",
  "name": "husainrijwan2001@gmail.com",
  "password": "Rijwan@123"
}


Example Login Payload:

{
  "email": "luke@starwars.com",
  "password": "StarWars@123"
}

Star Wars API
Endpoint	Method	Description
/api/v1/characters?page=1	GET	Get paginated list of characters
/api/v1/planets?page=1	GET	Get paginated list of planets
/api/v1/starships?page=1	GET	Get paginated list of starships
/api/v1/search	GET	Search characters, planets, or starships
🔒 Authentication Middleware

Protect routes by checking JWT cookie:

const token = req.cookies.authorization;
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
});

💡 Future Improvements

Add favorites list for logged-in users
Integrate server-side pagination and caching for better performance
Add React animations for Star Wars lightsaber effects

👨‍💻 Author
Rijwan Husain
