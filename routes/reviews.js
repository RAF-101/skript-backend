const express = require('express');
const { sequelize, Users, Review } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
        return res.status(401).json({ msg: "Log in please." });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    if(req.user.type == "Admin") 
        Users.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    else Users.findAll({ where: { id : req.user.userId } })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});

route.get('/messages', (req, res) => {
    if(req.user.type == "Admin") 
        Review.findAll({ include: ['user'] })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    else {
        Review.findAll({ include: ['user'], where: { userId: req.user.userId } })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
});

route.post('/messages', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.usertype) {
                Review.create({ body: req.body.body, userId: req.user.userId })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

module.exports = route;