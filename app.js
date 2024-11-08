// Import required modules
const express = require("express") // Express framework
const dotenv = require("dotenv") // Load environment variables
const morgan = require("morgan") // HTTP request logger middleware
const connectDB = require("./config/db") // Database connection file
const path = require("path")
const passport = require("passport")
const session = require("express-session")

// Handlebars template engine
const { engine } = require("express-handlebars")

//const { session } = require("passport")

// Load Config
dotenv.config({ path: './config/config.env' }) // Configure dotenv to read environment variables

//passport config
require('./config/passport')(passport)

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

//session abd should be above passport middleware
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', '.hbs') // Set view engine to Handlebars

// Routes
app.use('/', require("./routes/index")) // Use index route
app.use('/auth', require("./routes/auth")) // Use auth route

// Define the port for the server
const PORT = process.env.PORT || 5000

// Start the server
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`))
