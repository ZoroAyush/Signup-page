const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect(''); //hiding the mongodb url 

// Define User schema and model
const User = mongoose.model('Users', { name: String, email: String, password: String });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views'))); // Serve static files from 'views'

// Route to serve HTML form
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/signup.html'));
});

// Signup route to handle form submission
app.post("/signup", async function(req, res) {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).send("Username already exists");
    }

    const user = new User({ name: name, email: email, password: password });
    await user.save();

    res.send("User registered successfully!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
