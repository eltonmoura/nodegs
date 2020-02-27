const { User } = require('../models');
var jwt = require('jsonwebtoken');

class AuthController {
    constructor() {
        this.secret = process.env.SECRET;
        this.expiresIn = parseInt(process.env.EXPIRES_IN, 10);
    }

    login = async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email }});
            if (!user || user.password !== req.body.password) {
                return res.status(500).json({ message: 'Usuário ou senha inválido.' });
            }

            const token = jwt.sign({ id: user.id }, this.secret, {
                expiresIn: this.expiresIn
            });
            res.status(200).json({ auth: true, token: token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Falha ao logar' });
        }
    };

    logout = async (req, res) => {}

    me = async (req, res) => {
        try {

            // const token = req.headers.authorization;
            // if (!token) {
            //     return res.status(401).json({ auth: false, message: 'No authorization token provided.' });
            // }

            // const authInfo = jwt.verify(token, this.secret);

            const authInfo = req.authInfo;

            if (!authInfo) {
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }

            const user = await User.findByPk(authInfo.id);
            return res.status(200).json({ user, auth: { iat: authInfo.iat, exp: authInfo.exp } });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Falha ao checar token JWT' });
        }
    }

    
}
module.exports = new AuthController;
