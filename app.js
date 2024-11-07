// Import required modules
const express = require("express") // Express framework
const dotenv = require("dotenv") // Load environment variables
const morgan = require("morgan") // HTTP request logger middleware
const connectDB = require("./config/db") // Database connection file

// Handlebars template engine
const { engine } = require("express-handlebars")

// Load Config
dotenv.config({ path: './config/config.env' }) // Configure dotenv to read environment variables

// Connect to database
connectDB()

// Initialize Express application
const app = express()

// Logging middleware
if (process.env.NODE_ENV === 'development') { // Only log HTTP requests in development mode
    app.use(morgan('dev'))
}

// Set up Handlebars as the view engine
app.engine('.hbs', engine({
    defaultLayout: 'main', // Set default layout to 'main.hbs'
    extname: '.hbs' // Use .hbs extension for templates
}))

app.set('view engine', '.hbs') // Set view engine to Handlebars

// Routes
app.use('/', require("./routes/index")) // Use index route

// Define the port for the server
const PORT = process.env.PORT || 5000

// Start the server
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`))
