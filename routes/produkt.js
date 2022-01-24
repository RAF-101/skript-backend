const express = require('express');
const { sequelize, Users, Kategorija, Produkt } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
        alert("You don't have access.")
        return res.status(401).json({ msg: "Log in please." });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/produkt', (req, res) => {
    if(req.user.type == "Admin") 
        Produkt.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});

route.post('/produkt', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.usertype == "Admin") {
                Produkt.create({ 
                    ime: req.body.ime,
                    opis: req.body.opis,
                    cena: req.body.cena,
                    popust: req.body.popust,
                    kategorijaId: req.body.kategorijaId
                })
                    .then( rows => res.json(rows) )
                    .catch( err => {
                        console.log(err)
                        res.status(500).json(err) });
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json({ msg : "Server Error", err : err }));
        
});

module.exports = route;