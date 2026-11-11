
const express = require("express");

const app = express();

app.use(express.json());

// Sample user database
let users = [
    {
        id: 1,
        name: "Nagaraju",
        email: "nagaraju@example.com"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com"
    }
];

// Welcome API
app.get("/", (req, res) => {
    res.status(200).send("Welcome to SonarQube Demo Application");
});

// Health Check API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Application is running"
    });
});

// Get all users
app.get("/api/users", (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// Create a new user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length
            ? Math.max(...users.map(user => user.id)) + 1
            : 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});

module.exports = app;
