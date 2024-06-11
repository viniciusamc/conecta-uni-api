const university = require('../database/transactions/university');

class universityController {
        async create(req, res) {
                const { universityName, mec } = req.body;
                const { filename: image } = req.file
                const id = req.user.sub

                const insert = await university.insert(id, universityName, mec, image);

                return res.json({ insert });
        }

        async get(req, res) {
                const universities = await university.getAll()

                return res.json({ universities })
        }

        async index(req, res) {
                const { id } = req.params

                const projects = await university.getByName(id)

                return res.status(200).json(projects)
        }
}

module.exports = new universityController();
