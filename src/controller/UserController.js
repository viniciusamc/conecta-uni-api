const users = require('../database/transactions/users');
const { emailRegex } = require('../utils/regex');

class userController {
    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({message: 'Todos os campos são necessarios'})
        }

        if (password && password < 6) {
            return res.status(400).json({message: 'A senha deve ter pelo menos 6 caracteres'})
        }

        const emailVerify = emailRegex.test(email);

        if (!emailVerify) {
            return res.status(400).json({message: 'Email Inválido'})
        }

        const insert = await users.insert(name, email, password);

        if(insert == 'Email Já cadastrado') {
            return res.status(400).json({message: 'Email já em uso'})
        }

        return res.status(201).json({ message: 'Conta criada com sucesso', id: insert });
    }

    async get(req, res) {
        const { email } = req.body;

        const get = await users.getByEmail(email);
        return res.status(200).json({ get });
    }
}

module.exports = userController;
