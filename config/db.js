// Import the mongoose library for MongoDB interaction
const mongoose = require("mongoose")

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // Log a message if the connection is successful
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } 
    catch (err) {
        // Log an error if the connection fails
        console.error(err)
        process.exit(1) // Exit the process with failure code 1
    }
}

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB