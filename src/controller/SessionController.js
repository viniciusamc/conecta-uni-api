const user = require('../database/transactions/users');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt')
const authConfig = require('../utils/jwt')
const { sign } = require('jsonwebtoken')

class sessionController {
        async create(req, res) {
                const { email, password } = req.body;

                const userInfo = await user.getByEmail(email);

                if (!userInfo) {
                        return res.status(400).json({message: 'Email e/ou senha inválidos'})
                }

                const verifyPassword = await bcrypt.compare(password, userInfo.password_hash)

                if (!verifyPassword) {
                        return res.status(400).json({message: 'Email e/ou senha inválidos'})
                }

                const { secret, expiresIn } = authConfig.jwt;

                const token = sign({}, secret, {
                        subject: String(userInfo.id),
                        expiresIn
                })

                console.log(token)

                return res.json({ userInfo, token });
        }
}

module.exports = new sessionController();
