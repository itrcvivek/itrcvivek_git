const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to an uncaught exception');
    process.exit(1);
});

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" });

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to the database
connectDatabase();

// Start the server
const server = app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 6000}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to an unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
});
