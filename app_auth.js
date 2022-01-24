const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.get('/admin/toRegister', (req, res) => {
    res.status(200).json({ code : "OK"})
});
app.get('/admin/toLogin', (req, res) => {
    res.status(200).json({ code : "OK"})
});

app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        usertype: req.body.usertype,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    console.log("Register")

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name,
            type: rows.usertype
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => {
        res.send({ msg : "Invalid Data." })
    });
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name,
                    type: usr.usertype
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.send({ msg : "Invalid data." }) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});