const mongoose = require("mongoose");
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.LOCALDB_URL; // local mongodb connection
const mongoURL = process.env.MONGODB_URL;


// Setup MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connection established");
});

db.on('disconnected', () => {
    console.log("MongoDB connection disconnected");
});

db.on('error', (error) => {
    console.log("Error in MongoDB connection", error);
});

module.exports = db;
