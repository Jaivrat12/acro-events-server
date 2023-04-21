const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {

    try {

        const { SECRET } = process.env;
        jwt.verify(req.headers.authorization, SECRET);
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid Token' });
    }
};

module.exports = {
    isAuth,
};