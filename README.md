1. Project Setup
Create Project Directory
mkdir mern-project
cd mern-project
2. Backend Setup (Node.js + Express + MongoDB)
a. Imkdir backend
cd backend
npm init -y
b. Install dependencies

bash
Copy
npm install express mongoose cors dotenv
npm install nodemon --save-dev

c. Create necessary files

backend/
  ├── .env
  ├── server.js
  ├── models/
  │    └── Item.js
  ├── routes/
  │    └── items.js
  └── package.json


  d. Configure .env

  PORT=5000
MONGO_URI=mongodb://localhost:27017/mernDB



