var jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

var authVerify = function (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ auth: false, message: 'No authorization token provided.' });
        }

        const authInfo = jwt.verify(token, secret);
        if (!authInfo) {
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        }

        // Injeta a info na requisição
        req.authInfo = authInfo;

        next();
    } catch (e) {
       console.log(e);
       return res.status(401).json({ message: 'Access denied.' });
    }
}
module.exports = authVerify;
