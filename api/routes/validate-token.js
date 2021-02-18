const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        error: 'Access denied'
    });

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKE);
        req.user = verified;
        next()
    } catch (error) {
        res.status(401).json({ error: `Invalid Token` })
    }
};

module.exports = verifyToken;