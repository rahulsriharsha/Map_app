const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/users');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password1 === password){
                res.json("Success");
            } else {
                res.json("The password is incorrect.");
            }
        } else {
            res.json("No such records exists.")
        }
    })
})

mongoose.connection.once("open", () => {
    console.log("Now connected to MongoDB Atlas");
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
