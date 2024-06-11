const projects = require('../database/transactions/projects')
const AppError = require('../utils/AppError')

class projectController {
        async create(req, res) {
                const { title, description, teacher, course, colleagues, university, subject, semester } = req.body
                const { filename: image } = req.file
                const userId = req.user.sub

                const insertproject = await projects.insert(userId, title, description, course, teacher, colleagues, image, university, subject, semester)

                return res.json({ insertproject })
        }

        async get(req, res) {
                const { id } = req.params

                if (!id) {
                        throw new AppError('Id è obrigatório')
                }

                const getProject = await projects.get(id)

                return res.json({ getProject })
        }

        async index(req, res){
                const listProjects = await projects.getAll()

                return res.json(listProjects)
        }
}

module.exports = projectController;
