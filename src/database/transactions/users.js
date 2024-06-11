const { emailRegex } = require('../../utils/regex');
const tx = require('../database');
const bcrypt = require('bcrypt');

class User {
        async insert(name, email, password) {
                const query = 'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id';

                const hash = await bcrypt.hash(password, 12);

                let response;
                try {
                        response = await tx(query, [name, email, hash]);
                } catch (e) {
                        if (e.message === 'duplicate key value violates unique constraint "users_email_key"') {
                                return 'Email Já cadastrado';
                        } else {
                                console.error(e.message);
                                return 'Tente novamente mais tarde';
                        }
                }

                return response.rows[0].id;
        }

        async getByEmail(email) {
                const query = `SELECT * FROM users WHERE email = $1;`;

                if (!email) {
                        return 'Email é obrigatório';
                }

                let response;
                try {
                        response = await tx(query, [email]);
                } catch (err) {
                        console.error(err.message);
                }

                return response.rows[0];
        }
}

module.exports = new User();
