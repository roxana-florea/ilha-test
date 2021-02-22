require('dotenv').config();
const jwt = require('jsonwebtoken');

const getSignedToken = function (id) {
    return jwt.sign({ _id: id },
        process.env.SECRET_TOKE,
        { expiresIn: '1hr' }
    )
};

module.exports = getSignedToken;