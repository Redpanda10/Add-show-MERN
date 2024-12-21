// db.js
const mongoose = require('mongoose');

const mongoURL='mongodb://localhost:27017/tasks'
mongoose.connect(mongoURL)

db=mongoose.connection
// MongoDB connection function
db.on('connected',()=>{
    console.log('Connected to MongoDB')
})
db.on('error',()=>{
    console.log('Error connecting to MongoDB')
})
db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB')
})
// Export the connectDB function
module.exports = db;