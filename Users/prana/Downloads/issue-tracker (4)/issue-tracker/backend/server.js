// // server.js
// import dns from "node:dns"; // or: const dns = require("node:dns");
// dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare and Google DNS

// // Now import the rest of your modules
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// // ... rest of your importsCopied!   


// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// require('dotenv').config()

// const issueRoutes = require('./routes/issueRoutes')
// const teamRoutes = require('./routes/teamRoutes')

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.use('/api/issues', issueRoutes)
// app.use('/api/team', teamRoutes)

// app.get('/', (req, res) => res.json({ message: 'Issue Tracker API running' }))

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB')
//     app.listen(process.env.PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
//     )
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB error:', err.message)
//     process.exit(1)
//   })

// 1. Load 'dns' module FIRST and set servers BEFORE connecting to MongoDB
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Force public DNS to fix SRV lookup

// 2. Rest of your CommonJS imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const issueRoutes = require('./routes/issueRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/issues', issueRoutes);
app.use('/api/team', teamRoutes);

app.get('/', (req, res) => res.json({ message: 'Issue Tracker API running' }));

// 3. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });   