const jwt = require('jsonwebtoken');

module.exports.generateToken = (player) => {
    return jwt.sign({
        id: player.dataValues.id,
        player_name: player.dataValues.player_name,
        username: player.dataValues.username
    }, process.env.SECRET_KEY, { expiresIn: '8h' });
}