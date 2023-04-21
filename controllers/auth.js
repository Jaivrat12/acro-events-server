const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { USERNAME, PASSWORD, SECRET } = process.env;
    const { username, password } = req.body;

    let error = '';
    if (username === USERNAME) {

        if (password === PASSWORD) {

            const token = jwt.sign({
                username
            }, SECRET, {
                expiresIn: '7d'
            });

            res.status(200).json({ success: true, token });
            return;
        } else {
            error = 'Wrong password';
        }
    } else {
        error = 'Wrong username';
    }

    res.status(401).json({ success: false, error });
};

module.exports = {
    login,
};