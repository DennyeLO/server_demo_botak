const Player = require('../Model/Player')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Util/tokenGenerator')
const { validationResult  } = require('express-validator');

require("dotenv").config();

exports.isUsernameInUse = async (username) => {
    return Player.findOne({
        where: {
            username: username
        }
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error
    });

}

exports.register = async (req, res) => {
    var errors = validationResult(req);
    var { username, password, player_name, phone, email} = req.body;

    try{
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
    
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);
    
        // new player
        const newPlayer = new Player({
            username,
            player_name,
            phone,
            email,
            password
        });
    
        const res_player = await newPlayer.save();
        const token = generateToken(res_player);
        res.json({ token });
    }catch(error){
        res.status(500).json(error).end();
        res.statusMessage = "Terdapat Kesalahan Pada Server";
    }
}

exports.login = async (req,res) => {
    var errors = validationResult(req);
    var { username, password } = req.body;

    try{
        if(!errors.isEmpty()){
            throw new Error(errors);
        }

        const player = await Player.findOne({ where: { username } });
        if (!player) {
          throw new Error('User not found');
        }
        
        const match = await bcrypt.compare(password, player.password);
        if (!match) {
            throw new Error('Wrong crendetials');
        }
        const token = generateToken(player);

        res.json({ token });
    }catch(error){
        res.status(500).json(error).end();
        res.statusMessage = "Terdapat Kesalahan Pada Server";
    }
}