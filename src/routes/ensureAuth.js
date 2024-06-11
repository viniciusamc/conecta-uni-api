const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError.js')

function verifyToken(req, res, next) {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new AppError('Token Inválido!', 403)
        }

        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
                if (error) {
                        throw new AppError('Token is Invalid', 401)
                }

                req.user = decoded

                next()
        })
}

module.exports = verifyToken
