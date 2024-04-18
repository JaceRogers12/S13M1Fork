// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello from Jace's Express");
});

server.get("/api/users", async (req,res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({message: "The users information could not be retrieved"});
    }
})

server.get("/api/users/:id", async (req,res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(user);
        }
    } catch(error) {
        res.status(500).json({message: "The user information could not be retrieved"});
    }
})

server.post("/api/users", async (req,res) => {
    try {
        let {name, bio} = req.body;
        if (!name || !bio) {
            res.status(400).json({message: "Please provide name and bio for the user"});
        } else {
            let newUser = await User.insert({name, bio});
            res.status(201).json(newUser);
        }
    } catch(error) {
        res.status(500).json({message: "There was an error while saving the user to the database"});
    }
})

server.put("/api/users/:id", async (req,res) => {
    try {
        let {name, bio} = req.body;
        let selectedUser = await User.findById(req.params.id);
        if (!name || !bio) {
            res.status(400).json({message: "Please provide name and bio for the user"});
        } else if (!selectedUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            let updatedUser = await User.update(req.params.id, {name, bio});
            res.status(200).json(updatedUser);
        }
    } catch(error) {
        res.status(500).json({message: "The user information could not be modified"});
    }
})

server.delete("/api/users/:id", async (req,res) => {
    try {
        let deletedUser = await User.remove(req.params.id);
        if (!deletedUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(deletedUser);
        }
    } catch(error) {
        res.status(500).json({message: "The user could not be removed"});
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
