const DiskStorage = require('../../utils/DiskStorage.js')
const tx = require('../database.js')

class projects {
        async insert(user, title, description, course, teacher, colleagues, picture, university, subject, semester) {
                const query = 'INSERT INTO projects(fk_id_user, title, description, course, teacher, fk_id_university, subject, semester) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id'
                const queryColleagues = 'INSERT INTO join_project(fk_id_task, colleague) VALUES($1, $2)'
                const queryImages = 'INSERT INTO image_project(fk_id_project, image, fk_id_university) VALUES($1, $2, $3)'
                const queryUniversity = 'SELECT * FROM university WHERE university = $1';

                const getUniversity = await tx(queryUniversity, [university]);

                let idUniversity;
                if(getUniversity.rows.length === 0 ){
                        const newUniversity = 'INSERT INTO university(fk_id_user, university) VALUES ($1, $2) RETURNING id';
                        let insert = await tx(newUniversity, [user, university])
                        idUniversity = insert.rows[0].id
                } else {
                        idUniversity = getUniversity.rows[0].id
                }

                const diskStorage = new DiskStorage()
                const imageURL = await diskStorage.saveFile(picture)

                const insertProject = await tx(query, [user, title, description, course, teacher, idUniversity, subject, semester])
                const insertImage = await tx(queryImages, [insertProject.rows[0].id, imageURL, idUniversity])

                colleagues = colleagues.split(",")

                if (colleagues.length > 0) {
                        colleagues.map(async (item) => {
                                try {
                                        await tx(queryColleagues, [insertProject.rows[0].id, item])
                                } catch (error) {
                                        console.error(error.message)
                                }
                        })
                }

                return [insertProject, insertImage]

        }

        async get(id) {
                const query = 'SELECT * FROM projects LEFT JOIN image_project ON projects.id = image_project.fk_id_project LEFT JOIN university ON projects.fk_id_university = university.id WHERE projects.id = $1';
                const queryColleagues = 'SELECT * FROM join_project WHERE fk_id_task = $1';

                if (!id) {
                        return 'Id é necessário'
                }

                const getProject = await tx(query, [id]);
                const getColleagues = await tx(queryColleagues, [id])

                return [getProject.rows[0], getColleagues.rows]
        }

        async getAll(){
                const query = 'SELECT * FROM projects LEFT JOIN image_project ON projects.id = image_project.fk_id_project LEFT JOIN university ON projects.fk_id_university = university.id'

                const getProjects = await tx(query)

                const result = {
                        projects: getProjects.rows
                }

                return result
        }
}

module.exports = new projects();
